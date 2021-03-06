import {
    TAddress,
    TBig_map,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TBool,
    TBytes,
    TChain_id,
    TInt,
    TKey,
    TKey_hash,
    TLambda,
    TList,
    TMap,
    TMutez,
    TNat,
    TOption,
    TOr,
    TPair,
    TRecord,
    TSapling_state,
    TSet,
    TSignature,
    TString,
    TTicket,
    TTimestamp,
    TUnit,
    TVariant,
} from '../../src/type';
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
    List,
    Set,
    Some,
    None,
    Pair,
    Map,
    Big_map,
    Ticket,
    Sapling_state,
    Variant,
    Record,
    Lambda,
    GreaterThan,
    Right,
    Left,
} from '../../src/expression';
import { If, Return } from '../../src/statement';
import { ILiteral } from '../../src/typings/literal';
import { IType } from '../../src/typings/type';
import { verifyContractCompilationOutput } from '../util';
import { Contract } from '../../src/core';

const verifyLiteral = (testName: string, type: IType, literal: ILiteral) => {
    it(testName, () => {
        const contract = new Contract().setStorageType(type).setStorage(literal);

        verifyContractCompilationOutput(contract);
    });
};

describe('Test Literals', () => {
    // Singletons
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
    // Containers
    verifyLiteral('list', TList(TString()), List([String('HELLO'), String('WORLD')]));
    verifyLiteral('set', TSet(TString()), Set([String('HELLO'), String('WORLD')]));
    verifyLiteral('some', TOption(TString()), Some(String('HELLO')));
    verifyLiteral('none', TOption(TString()), None());
    verifyLiteral('pair', TPair(TNat(), TString()), Pair(Nat(1), String('WORD')));
    verifyLiteral(
        'map',
        TMap(TNat(), TString()),
        Map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]),
    );
    verifyLiteral(
        'big_map',
        TBig_map(TNat(), TString()),
        Big_map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]),
    );
    verifyLiteral(
        'lambda',
        TLambda(TString(), TString()),
        Lambda()
            .setInputType(TString())
            .code((arg) => [Return(arg)]),
    );
    verifyLiteral(
        'lambda',
        TLambda(TNat(), TString()),
        Lambda().code((arg) => [If(GreaterThan(arg, Nat(2)), [Return(String('YES'))], [Return(String('NO'))])]),
    );
    // @TODO (test ticket)
    //verifyLiteral('ticket', TTicket(TString()), Ticket(String('A Ticket'), Nat(1)));
    verifyLiteral('sapling_state', TSapling_state(8), Sapling_state(8));
    verifyLiteral(
        'record',
        TRecord(
            {
                field1: TNat(),
                field2: TInt(),
                field3: TBytes(),
            },
            [['field1', 'field2'], 'field3'],
        ),
        Record({
            field1: Nat(1),
            field2: Int(2),
            field3: Bytes('0x00'),
        }),
    );
    verifyLiteral(
        'variant',
        TVariant({
            match1: TNat(),
            match2: TInt(),
            match3: TBytes(),
        }),
        Variant('match2', Int(1)),
    );
    verifyLiteral('Left variant', TOr(TNat(), TInt()), Left(Nat(1)));
    verifyLiteral('Right variant', TOr(TNat(), TInt()), Right(Int(1)));
});
