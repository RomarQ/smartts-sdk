import { Contract, EntryPoint } from '../../src/core';
import { DeleteMapEntry, ForEachOf, MatchVariant, NewVariable, Require, SetValue } from '../../src/statement';
import { Layout } from '../../src/core/enums/layout';
import {
    ContractStorage,
    Equal,
    Address,
    Big_map,
    Bool,
    Record,
    String,
    GetMapEntries,
    GetSender,
    Pair,
    GetMapValue,
    GetVariable,
    Math,
    Nat,
    Comparison,
    Unit,
    Not,
    List,
    Transfer,
    Mutez,
    MapContainsKey,
    PrependToList,
    Or,
    GreaterThanOrEqual,
    CastToNat,
} from '../../src/expression';
import {
    TAddress,
    TBig_map,
    TBool,
    TBytes,
    TMap,
    TNat,
    TRecord,
    TString,
    TPair,
    TUnit,
    TList,
    TContract,
    TVariant,
} from '../../src/type';

/**
 * Error Codes
 */
enum FA2_Error {
    NOT_ADMIN = 'FA2__Not_Admin',
    NOT_OWNER = 'FA2__NOT_OWNER',
    PAUSED = 'FA2__PAUSED',
    TOKEN_UNDEFINED = 'FA2__TOKEN_UNDEFINED',
    NOT_OPERATOR = 'FA2__NOT_OPERATOR',
    INSUFFICIENT_BALANCE = 'FA2__INSUFFICIENT_BALANCE',
}

/**
 * Types
 */
const TLedgerKey = TPair(TAddress(), TNat());
const TLedgerValue = TRecord(
    {
        balance: TNat(),
    },
    Layout.right_comb,
);
const TOperatorKey = TRecord(
    {
        owner: TAddress(),
        operator: TAddress(),
        token_id: TNat(),
    },
    ['owner', ['operator', 'token_id']],
);
const TTokenMetadata = TRecord(
    {
        token_id: TNat(),
        token_info: TMap(TString(), TBytes()),
    },
    Layout.right_comb,
);

class EntrypointTypes {
    // "transfer"
    static Transfer = TList(
        TRecord(
            {
                from_: TAddress(),
                txs: TList(
                    TRecord(
                        {
                            to_: TAddress(),
                            token_id: TNat(),
                            amount: TNat(),
                        },
                        ['to_', ['token_id', 'amount']],
                    ),
                ),
            },
            ['from_', 'txs'],
        ),
    );
    // "update_operators"
    static UpdateOperators = TList(
        TVariant(
            {
                add_operator: TOperatorKey,
                remove_operator: TOperatorKey,
            },
            ['add_operator', 'remove_operator'],
        ),
    );
    // "balance_of"
    static BalanceOf = TRecord(
        {
            requests: TList(
                TRecord(
                    {
                        owner: TAddress(),
                        token_id: TNat(),
                    },
                    ['owner', 'token_id'],
                ),
            ),
            callback: TContract(
                TList(
                    TRecord(
                        {
                            request: TRecord(
                                {
                                    owner: TAddress(),
                                    token_id: TNat(),
                                },
                                ['owner', 'token_id'],
                            ),
                            balance: TNat(),
                        },
                        ['request', 'balance'],
                    ),
                ),
            ),
        },
        ['requests', 'callback'],
    );
    // "mint"
    static Mint = TRecord(
        {
            address: TAddress(),
            amount: TNat(),
            token_id: TNat(),
        },
        Layout.right_comb,
    );
}

/**
 * Common Expressions
 */
class CommonExpressions {
    // Terminate contract execution and fail if the sender is not the administrator
    static FailIfSenderIsNotAdmin = () =>
        Require(Equal(GetSender(), ContractStorage().config.administrator), String(FA2_Error.NOT_ADMIN));

    // Terminate contract execution and fail if the contract is paused
    static FailIfContractIsPaused = () => Require(Not(ContractStorage().config.paused), String(FA2_Error.PAUSED));
}
const FA2Contract = new Contract()
    .setStorageType(
        TRecord(
            {
                config: TRecord({
                    administrator: TAddress(),
                    paused: TBool(),
                }),
                assets: TRecord({
                    ledger: TBig_map(TLedgerKey, TLedgerValue),
                    operators: TBig_map(TOperatorKey, TUnit()),
                    token_metadata: TBig_map(TNat(), TTokenMetadata),
                    token_total_supply: TBig_map(TNat(), TNat()),
                }),
                metadata: TBig_map(TString(), TBytes()),
            },
            Layout.right_comb,
        ),
    )
    .setStorage(
        Record({
            config: Record({
                administrator: Address('tz1'),
                paused: Bool(false),
            }),
            assets: Record({
                ledger: Big_map([], TLedgerKey, TLedgerValue),
                operators: Big_map([], TOperatorKey, TUnit()),
                token_metadata: Big_map([], TNat(), TTokenMetadata),
                token_total_supply: Big_map([], TNat(), TNat()),
            }),
            metadata: Big_map(),
        }),
    )
    .addEntrypoint(
        new EntryPoint('transfer').inputType(EntrypointTypes.Transfer).code((entrypoint_arg) => [
            // The contract must not be paused
            CommonExpressions.FailIfContractIsPaused(),
            // Iterate over each transfer request
            ForEachOf(entrypoint_arg).Do((transfer) => [
                // Iterate over each transaction
                ForEachOf(transfer.txs).Do((transaction) => [
                    // Fail if the token does not exist
                    Require(
                        MapContainsKey(ContractStorage().assets.token_total_supply, transaction.token_id),
                        String(FA2_Error.TOKEN_UNDEFINED),
                    ),
                    // Verify if sender has permissions
                    Require(
                        Or(
                            Equal(GetSender(), transfer.from_),
                            MapContainsKey(
                                ContractStorage().assets.operators,
                                Record({
                                    owner: transfer.from_,
                                    operator: GetSender(),
                                    token_id: transaction.token_id,
                                }),
                            ),
                        ),
                        String(FA2_Error.NOT_OPERATOR),
                    ),
                    // Decrement balance from the source address
                    NewVariable('sender_ledger_key', Pair(transfer.from_, transaction.token_id)),
                    NewVariable(
                        'sender_balance',
                        GetMapValue(
                            ContractStorage().assets.ledger,
                            GetVariable('sender_ledger_key'),
                            Record({ balance: Nat(0) }),
                        ).balance,
                    ),
                    SetValue(
                        GetMapValue(ContractStorage().assets.ledger, GetVariable('sender_ledger_key')),
                        Record({
                            balance: CastToNat(
                                Math.Subtract(GetVariable('sender_balance'), transaction.amount),
                                String(FA2_Error.INSUFFICIENT_BALANCE),
                            ),
                        }),
                    ),
                    // Increment balance to the recipient address
                    NewVariable('recipient_ledger_key', Pair(transaction.to_, transaction.token_id)),
                    NewVariable(
                        'recipient_balance',
                        GetMapValue(
                            ContractStorage().assets.ledger,
                            GetVariable('recipient_ledger_key'),
                            Record({ balance: Nat(0) }),
                        ).balance,
                    ),
                    SetValue(
                        GetMapValue(ContractStorage().assets.ledger, GetVariable('recipient_ledger_key')),
                        Record({ balance: Math.Add(GetVariable('recipient_balance'), transaction.amount) }),
                    ),
                ]),
            ]),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('update_operators').inputType(EntrypointTypes.UpdateOperators).code((entrypoint_arg) => [
            // The contract must not be paused
            CommonExpressions.FailIfContractIsPaused(),
            // Apply actions
            ForEachOf(entrypoint_arg).Do((item) => [
                MatchVariant(item)
                    .Case('add_operator', (payload) => [
                        Require(Equal(payload.owner, GetSender()), String(FA2_Error.NOT_OWNER)),
                        SetValue(GetMapValue(ContractStorage().assets.operators, payload), Unit()),
                    ])
                    .Case('remove_operator', (payload) => [
                        Require(Equal(payload.owner, GetSender()), String(FA2_Error.NOT_OWNER)),
                        DeleteMapEntry(ContractStorage().assets.operators, payload),
                    ]),
            ]),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('balance_of').inputType(EntrypointTypes.BalanceOf).code((entrypoint_arg) => [
            // Fail if contract is paused
            CommonExpressions.FailIfContractIsPaused(),
            // Iterate over each request "list(requests)" and compute responses
            NewVariable('responses', List([])),
            ForEachOf(entrypoint_arg.requests).Do((request) => [
                // Fail if the token does not exist
                Require(
                    MapContainsKey(ContractStorage().assets.token_total_supply, request.token_id),
                    String(FA2_Error.TOKEN_UNDEFINED),
                ),
                SetValue(
                    GetVariable('responses'),
                    PrependToList(
                        GetVariable('responses'),
                        Record({
                            request,
                            balance: GetMapValue(
                                ContractStorage().assets.ledger,
                                Pair(request.owner, request.token_id),
                                Record({ balance: Nat(0) }),
                            ).balance,
                        }),
                    ),
                ),
            ]),
            // Callback the requester with a response
            Transfer(entrypoint_arg.callback, Mutez(0), GetVariable('responses')).send(),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('mint').inputType(EntrypointTypes.Mint).code((entrypoint_arg) => [
            // Sender must be the administrator
            CommonExpressions.FailIfSenderIsNotAdmin(),
            NewVariable('ledger_key', Pair(entrypoint_arg.address, entrypoint_arg.token_id)),
            NewVariable(
                'balance',
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key'), Record({ balance: Nat(0) }))
                    .balance,
            ),
            SetValue(
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key')),
                Record({ balance: Math.Add(GetVariable('balance'), entrypoint_arg.amount) }),
            ),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('pause').inputType(TBool()).code((paused) => [
            // Sender must be the administrator
            CommonExpressions.FailIfSenderIsNotAdmin(),
            // Update paused state
            SetValue(ContractStorage().config.paused, paused),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('set_admin').inputType(TAddress()).code((address) => [
            // Sender must be the administrator
            CommonExpressions.FailIfSenderIsNotAdmin(),
            // Update administrator address
            SetValue(ContractStorage().config.administrator, address),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('update_metadata').inputType(TMap(TString(), TBytes())).code((metadata) => [
            // Sender must be the administrator
            CommonExpressions.FailIfSenderIsNotAdmin(),
            // Update metadata entries
            ForEachOf(GetMapEntries(metadata)).Do((item) => [
                SetValue(GetMapValue(ContractStorage().metadata, item.key), item.value),
            ]),
        ]),
    );

export default FA2Contract;
