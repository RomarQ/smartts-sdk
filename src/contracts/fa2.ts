import type { ILiteral } from '../typings/literal';
import { Contract, EntryPoint } from '../core';
import {
    ContractStorage,
    Equal,
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
    Unit,
    Not,
    List,
    Transfer,
    Mutez,
    MapContainsKey,
    PrependToList,
    Or,
    CastToNat,
} from '../expression';
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
} from '../type';
import { DeleteMapEntry, ForEachOf, MatchVariant, NewVariable, Require, SetValue } from '../statement';
import { Layout } from '../core/enums/layout';
import LiteralAtom from '../core/enums/literal';

/**
 * FA2 Error Codes
 * @enum
 */
export enum FA2_Error {
    NOT_ADMIN = 'FA2__Not_Admin',
    NOT_OWNER = 'FA2__NOT_OWNER',
    PAUSED = 'FA2__PAUSED',
    TOKEN_UNDEFINED = 'FA2__TOKEN_UNDEFINED',
    NOT_OPERATOR = 'FA2__NOT_OPERATOR',
    INSUFFICIENT_BALANCE = 'FA2__INSUFFICIENT_BALANCE',
}

/**
 * FA2 Types
 * @enum
 */
export class FA2_Types {
    static LedgerKey = TPair(TAddress(), TNat());
    static LedgerValue = TRecord(
        {
            balance: TNat(),
        },
        Layout.right_comb,
    );
    static OperatorKey = TRecord(
        {
            owner: TAddress(),
            operator: TAddress(),
            token_id: TNat(),
        },
        ['owner', ['operator', 'token_id']],
    );
    static TokenMetadata = TRecord(
        {
            token_id: TNat(),
            token_info: TMap(TString(), TBytes()),
        },
        Layout.right_comb,
    );
    // Contract storage type
    static Storage = TRecord(
        {
            config: TRecord({
                administrator: TAddress(),
                paused: TBool(),
            }),
            assets: TRecord({
                ledger: TBig_map(FA2_Types.LedgerKey, FA2_Types.LedgerValue),
                operators: TBig_map(FA2_Types.OperatorKey, TUnit()),
                token_metadata: TBig_map(TNat(), FA2_Types.TokenMetadata),
                token_total_supply: TBig_map(TNat(), TNat()),
            }),
            metadata: TBig_map(TString(), TBytes()),
        },
        Layout.right_comb,
    );
    // Entrypoint argument types
    static Entrypoint = {
        // "transfer"
        Transfer: TList(
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
        ),
        // "update_operators"
        UpdateOperators: TList(
            TVariant(
                {
                    add_operator: FA2_Types.OperatorKey,
                    remove_operator: FA2_Types.OperatorKey,
                },
                ['add_operator', 'remove_operator'],
            ),
        ),
        // "balance_of"
        BalanceOf: TRecord(
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
        ),
        // "mint"
        Mint: TRecord(
            {
                address: TAddress(),
                amount: TNat(),
                token_id: TNat(),
            },
            Layout.right_comb,
        ),
    };
}

/**
 * Common Expressions
 */
export class Utils {
    // Terminate contract execution and fail if the sender is not the administrator
    static FailIfSenderIsNotAdmin = () =>
        Require(Equal(GetSender(), ContractStorage().config.administrator), String(FA2_Error.NOT_ADMIN));

    // Terminate contract execution and fail if the contract is paused
    static FailIfContractIsPaused = () => Require(Not(ContractStorage().config.paused), String(FA2_Error.PAUSED));
}

/**
 * Build the contract expression (It is configurable)
 *
 * @param storage The contract initial storage
 *
 * @returns The contract expression
 */
export const FA2_Contract = (storage: {
    config: {
        administrator: ILiteral<LiteralAtom.address>;
        paused: ILiteral<LiteralAtom.bool>;
    };
    assets: {
        ledger?: ILiteral<LiteralAtom.big_map>;
        operators?: ILiteral<LiteralAtom.big_map>;
        token_metadata?: ILiteral<LiteralAtom.big_map>;
        token_total_supply?: ILiteral<LiteralAtom.big_map>;
    };
    metadata?: ILiteral<LiteralAtom.big_map>;
}) =>
    new Contract()
        // Set storage type
        .setStorageType(FA2_Types.Storage)
        // Define the initial storage
        .setStorage(
            Record({
                config: Record({
                    administrator: storage.config.administrator,
                    paused: storage?.config?.paused || Bool(false),
                }),
                assets: Record({
                    ledger: storage?.assets?.ledger || Big_map(),
                    operators: storage?.assets?.operators || Big_map(),
                    token_metadata: storage?.assets?.token_metadata || Big_map(),
                    token_total_supply: storage?.assets?.token_total_supply || Big_map(),
                }),
                metadata: storage?.metadata || Big_map(),
            }),
        )
        //
        // Define the contract entrypoints
        //
        .addEntrypoint(
            new EntryPoint('transfer').setInputType(FA2_Types.Entrypoint.Transfer).code((entrypoint_arg) => [
                // The contract must not be paused
                Utils.FailIfContractIsPaused(),
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
            new EntryPoint('update_operators')
                .setInputType(FA2_Types.Entrypoint.UpdateOperators)
                .code((entrypoint_arg) => [
                    // The contract must not be paused
                    Utils.FailIfContractIsPaused(),
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
            new EntryPoint('balance_of').setInputType(FA2_Types.Entrypoint.BalanceOf).code((entrypoint_arg) => [
                // Fail if contract is paused
                Utils.FailIfContractIsPaused(),
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
            new EntryPoint('mint').setInputType(FA2_Types.Entrypoint.Mint).code((entrypoint_arg) => [
                // Sender must be the administrator
                Utils.FailIfSenderIsNotAdmin(),
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
            new EntryPoint('pause').setInputType(TBool()).code((paused) => [
                // Sender must be the administrator
                Utils.FailIfSenderIsNotAdmin(),
                // Update paused state
                SetValue(ContractStorage().config.paused, paused),
            ]),
        )
        .addEntrypoint(
            new EntryPoint('set_admin').setInputType(TAddress()).code((address) => [
                // Sender must be the administrator
                Utils.FailIfSenderIsNotAdmin(),
                // Update administrator address
                SetValue(ContractStorage().config.administrator, address),
            ]),
        )
        .addEntrypoint(
            new EntryPoint('update_metadata').setInputType(TMap(TString(), TBytes())).code((metadata) => [
                // Sender must be the administrator
                Utils.FailIfSenderIsNotAdmin(),
                // Update metadata entries
                ForEachOf(GetMapEntries(metadata)).Do((item) => [
                    SetValue(GetMapValue(ContractStorage().metadata, item.key), item.value),
                ]),
            ]),
        );

export default FA2_Contract;
