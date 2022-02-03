import { Contract, EntryPoint } from '../../src/core';
import { Unit } from '../../src/core/literal';
import {
    TAddress,
    TBig_map,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TBool,
    TBytes,
    TChain_id,
    TContract,
    TInt,
    TKey,
    TKey_hash,
    TLambda,
    TList,
    TMap,
    TMutez,
    TNat,
    TNever,
    TOperation,
    TOption,
    TPair,
    TRecord,
    TSapling_state,
    TSapling_transaction,
    TSet,
    TSignature,
    TString,
    TTicket,
    TTimestamp,
    TUnit,
} from '../../src/core/type';
import { IType } from '../../src/typings/type';
import { verifyMichelsonOutput } from '../util';

const verifyType = (testName: string, type: IType) => {
    it(testName, () => {
        const contract = new Contract()
            .setStorageType(TUnit())
            .setStorage(Unit())
            .addEntrypoint(new EntryPoint('ep1').inputType(type).code(() => []))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
};

describe('Test Types', () => {
    verifyType('unit', TUnit());
    verifyType('nat', TNat());
    verifyType('int', TInt());
    verifyType('mutez', TMutez());
    verifyType('string', TString());
    verifyType('bool', TBool());
    verifyType('bytes', TBytes());
    verifyType('addres', TAddress());
    verifyType('timestamp', TTimestamp());
    verifyType('chain_id', TChain_id());
    verifyType('bls12_381_fr', TBls12_381_fr());
    verifyType('bls12_381_g1', TBls12_381_g1());
    verifyType('bls12_381_g2', TBls12_381_g2());
    verifyType('key', TKey());
    verifyType('key_hash', TKey_hash());
    verifyType('signature', TSignature());
    verifyType('operation', TOperation());
    verifyType('never', TNever());
    // Container types
    verifyType('list', TList(TNat()));
    verifyType('set', TSet(TNat()));
    verifyType('option', TOption(TNat()));
    verifyType('option', TPair(TNat(), TNat()));
    verifyType('map', TMap(TNat(), TNat()));
    verifyType('big_map', TBig_map(TNat(), TNat()));
    verifyType('lambda', TLambda(TNat(), TUnit()));
    verifyType('ticket', TTicket(TNat()));
    verifyType('contract', TContract(TNat()));
    verifyType('sapling_state', TSapling_state(8));
    verifyType('sapling_transaction', TSapling_transaction(16));
    // Artificial Types
    verifyType(
        'record (right comb)',
        TRecord({
            field1: TNat(),
            field2: TUnit(),
            field3: TString(),
        }),
    );
    verifyType(
        'record (left comb)',
        TRecord(
            {
                field1: TNat(),
                field2: TUnit(),
                field3: TString(),
            },
            [['field1', 'field2'], 'field3'],
        ),
    );
    // TVariant,
});
