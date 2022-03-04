import { Contract, EntryPoint } from '../../src/core';
import { ForEachOf, NewVariable, Require, SetValue } from '../../src/statement';
import { Layout } from '../../src/core/enums/layout';
import {
    GetProperty,
    ContractStorage,
    Equal,
    Address,
    Big_map,
    Bool,
    Record,
    String,
    GetEntries,
    GetSender,
    Pair,
    GetMapValue,
    GetVariable,
    Math,
    Nat,
} from '../../src/expression';
import { TAddress, TBig_map, TBool, TBytes, TMap, TNat, TRecord, TString, TPair, TUnit } from '../../src/type';

/**
 * Error Codes
 */
enum FA2_Error {
    NOT_ADMIN = 'FA2__Not_Admin',
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
const TOperatorKey = TRecord({ operator: TAddress(), owner: TAddress(), token_id: TNat() }, Layout.right_comb);
const TTokenMetadata = TRecord(
    {
        token_id: TNat(),
        token_info: TMap(TString(), TBytes()),
    },
    Layout.right_comb,
);

const TMintArgument = TRecord(
    {
        address: TAddress(),
        amount: TNat(),
        token_id: TNat(),
    },
    Layout.right_comb,
);

/**
 * Common Expressions
 */
const FailIfSenderIsNotAdmin = () =>
    Require(Equal(GetSender(), ContractStorage().config.administrator), String(FA2_Error.NOT_ADMIN));

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
    .addEntrypoint(new EntryPoint('transfer'))
    .addEntrypoint(new EntryPoint('update_operators'))
    .addEntrypoint(
        new EntryPoint('mint').inputType(TMintArgument).code((arg) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            NewVariable('ledger_key', Pair(arg.address, arg.token_id)),
            NewVariable(
                'balance',
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key'), Record({ balance: Nat(0) }))
                    .balance,
            ),
            SetValue(
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key')),
                Record({ balance: Math.Add(GetVariable('balance'), arg.amount) }),
            ),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('pause').inputType(TBool()).code((paused) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update paused state
            SetValue(ContractStorage().config.paused, paused),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('set_admin').inputType(TAddress()).code((address) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update administrator address
            SetValue(ContractStorage().config.administrator, address),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('update_metadata').inputType(TMap(TString(), TBytes())).code((metadata) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update metadata entries
            ForEachOf(GetEntries(metadata)).Do((item) => [
                SetValue(GetMapValue(ContractStorage().metadata, item.key), item.value),
            ]),
        ]),
    );

export default FA2Contract;
