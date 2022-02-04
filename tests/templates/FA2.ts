import { Contract, EntryPoint, GetSender } from '../../src/core';
import { Require, SetValue } from '../../src/core/command';
import { Layout } from '../../src/core/enums/layout';
import { GetProperty, ContractStorage, Equal, Address, Big_map, Bool, Record, String } from '../../src/core/expression';
import { TAddress, TBig_map, TBool, TBytes, TMap, TNat, TRecord, TString, TPair, TUnit } from '../../src/core/type';

/**
 * Error Codes
 */
enum FA2_Error {
    NOT_ADMIN = 'FA2__Not_Admin',
}

/**
 * Common Types
 */
const CommonTypes = {
    LedgerKey: TPair(TAddress(), TNat()),
    LedgerValue: TRecord(
        {
            balance: TNat(),
        },
        Layout.right_comb,
    ),
    OperatorKey: TRecord({ operator: TAddress(), owner: TAddress(), token_id: TNat() }, Layout.right_comb),
    TokenMetadata: TRecord(
        {
            token_id: TNat(),
            token_info: TMap(TString(), TBytes()),
        },
        Layout.right_comb,
    ),
};

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
                    ledger: TBig_map(CommonTypes.LedgerKey, CommonTypes.LedgerValue),
                    operators: TBig_map(CommonTypes.OperatorKey, TUnit()),
                    token_metadata: TBig_map(TNat(), CommonTypes.TokenMetadata),
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
                ledger: Big_map([], CommonTypes.LedgerKey, CommonTypes.LedgerValue),
                operators: Big_map([], CommonTypes.OperatorKey, TUnit()),
                token_metadata: Big_map([], TNat(), CommonTypes.TokenMetadata),
                token_total_supply: Big_map([], TNat(), TNat()),
            }),
            metadata: Big_map(),
        }),
    )
    .addEntrypoint(new EntryPoint('transfer'))
    .addEntrypoint(new EntryPoint('update_operators'))
    .addEntrypoint(
        new EntryPoint('mint').code(() => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('pause').inputType(TBool()).code((bool) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update paused state
            SetValue(ContractStorage().config.paused, bool),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('set_admin').inputType(TAddress()).code((address) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update administrator address
            SetValue(GetProperty('administrator', GetProperty('config', ContractStorage())), address),
        ]),
    )
    .addEntrypoint(new EntryPoint('update_metadata').inputType(TMap(TString(), TBytes())).code(() => []));

export default FA2Contract;
