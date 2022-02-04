import {
    TAddress,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TBool,
    TBytes,
    TChain_id,
    TInt,
    TKey,
    TKey_hash,
    TMutez,
    TNat,
    TSignature,
    TString,
    TTimestamp,
    TUnit,
} from '../../src/core/type';
import {
    Int,
    Mutez,
    Nat,
    Unit,
    String,
    Bool,
    Bytes,
    Address,
    Timestamp,
    Chain_id,
    Bls12_381_fr,
    Bls12_381_g2,
    Bls12_381_g1,
    Key_hash,
    Signature,
    Key,
} from '../../src/core/literal';
import { ILiteral } from '../../src/typings/literal';
import { IType } from '../../src/typings/type';
import { verifyMichelsonOutput } from '../util';
import { Contract } from '../../src';

const verifyLiteral = (testName: string, type: IType, literal: ILiteral<unknown>) => {
    it(testName, () => {
        const contract = new Contract().setStorageType(type).setStorage(literal).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
};

describe('Test Literals', () => {
    verifyLiteral('unit', TUnit(), Unit());
    verifyLiteral('nat', TNat(), Nat(1));
    verifyLiteral('int', TInt(), Int(2));
    verifyLiteral('mutez', TMutez(), Mutez(2));
    verifyLiteral('string', TString(), String('TEST STRING'));
    verifyLiteral('bool', TBool(), Bool(true));
    verifyLiteral('bytes', TBytes(), Bytes('0x00'));
    verifyLiteral('address', TAddress(), Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'));
    verifyLiteral('timestamp', TTimestamp(), Timestamp(100));
    verifyLiteral('chain_id', TChain_id(), Chain_id('0x00'));
    verifyLiteral('bls12_381_fr', TBls12_381_fr(), Bls12_381_fr('0x01'));
    verifyLiteral('bls12_381_fr', TBls12_381_fr(), Bls12_381_fr(1));
    verifyLiteral('bls12_381_g1', TBls12_381_g1(), Bls12_381_g1('0x00'));
    verifyLiteral('bls12_381_g2', TBls12_381_g2(), Bls12_381_g2('0x00'));
    verifyLiteral('key', TKey(), Key('edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT'));
    verifyLiteral('key_hash', TKey_hash(), Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'));
    verifyLiteral(
        'signature',
        TSignature(),
        Signature('sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe'),
    );
});
