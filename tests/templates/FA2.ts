import { Contract, EntryPoint } from '../../src/core';
import { Layout } from '../../src/core/enums/layout';
import { Address, BigMap, Bool, Record } from '../../src/core/literal';
import { TAddress, TBigMap, TBool, TBytes, TMap, TNat, TRecord, TString, TTuple, TUnit } from '../../src/core/type';

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

const FA2Contract = new Contract()
    .setStorageType(
        TRecord({
            config: TRecord({
                admin: TAddress,
                paused: TBool,
            }),
            assets: TRecord({
                ledger: TBigMap(CommonTypes.LedgerKey, CommonTypes.LedgerValue),
                operators: TBigMap(CommonTypes.OperatorKey, TUnit),
                token_metadata: TBigMap(TNat, CommonTypes.TokenMetadata),
                token_total_supply: TBigMap(TNat, TNat),
            }),
            metadata: TBigMap(TString, TBytes),
        }),
    )
    .setStorage(
        Record({
            config: Record({
                admin: Address('tz1'),
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
    .addEntrypoint(new EntryPoint('mint'))
    .addEntrypoint(new EntryPoint('pause'))
    .addEntrypoint(new EntryPoint('set_admin'))
    .addEntrypoint(new EntryPoint('update_metadata'));

export default FA2Contract;
