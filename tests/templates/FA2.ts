import { Contract, EntryPoint, GetSender } from '../../src/core';
import { If, Require, SetValue } from '../../src/core/command';
import { Layout } from '../../src/core/enums/layout';
import { GetProperty, ContractStorage, Equal } from '../../src/core/expression';
import { Address, BigMap, Bool, Record, String } from '../../src/core/literal';
import { TAddress, TBigMap, TBool, TBytes, TMap, TNat, TRecord, TString, TTuple, TUnit } from '../../src/core/type';

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
    LedgerKey: TTuple(TAddress, TNat),
    LedgerValue: TRecord(
        {
            balance: TNat,
        },
        Layout.right_comb,
    ),
    OperatorKey: TRecord({ operator: TAddress, owner: TAddress, token_id: TNat }, Layout.right_comb),
    TokenMetadata: TRecord(
        {
            token_id: TNat,
            token_info: TMap(TString, TBytes),
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
                    administrator: TAddress,
                    paused: TBool,
                }),
                assets: TRecord({
                    ledger: TBigMap(CommonTypes.LedgerKey, CommonTypes.LedgerValue),
                    operators: TBigMap(CommonTypes.OperatorKey, TUnit),
                    token_metadata: TBigMap(TNat, CommonTypes.TokenMetadata),
                    token_total_supply: TBigMap(TNat, TNat),
                }),
                metadata: TBigMap(TString, TBytes),
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
                ledger: BigMap([], CommonTypes.LedgerKey, CommonTypes.LedgerValue),
                operators: BigMap([], CommonTypes.OperatorKey, TUnit),
                token_metadata: BigMap([], TNat, CommonTypes.TokenMetadata),
                token_total_supply: BigMap([], TNat, TNat),
            }),
            metadata: BigMap(),
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
        new EntryPoint('pause').inputType(TBool).code((bool) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update paused state
            SetValue(ContractStorage().config.paused, bool),
        ]),
    )
    .addEntrypoint(
        new EntryPoint('set_admin').inputType(TAddress).code((address) => [
            // Sender must be the administrator
            FailIfSenderIsNotAdmin(),
            // Update administrator address
            SetValue(GetProperty('administrator', GetProperty('config', ContractStorage())), address),
        ]),
    )
    .addEntrypoint(new EntryPoint('update_metadata').code(() => []));

export default FA2Contract;
