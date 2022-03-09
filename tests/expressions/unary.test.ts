import { ContractStorage, Negate, None, Not, Record, Some } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBls12_381_fr, TBls12_381_g1, TBls12_381_g2, TBool, TInt, TNat, TOption, TRecord } from '../../src/type';

describe('Unary expressions', () => {
    it('Not', () => {
        const contract = new Contract()
            .setStorage(None())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TBool())
                    .code((arg) => [SetValue(ContractStorage(), Some(Not(arg)))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Negate', () => {
        const contract = new Contract()
            .setStorageType(
                TRecord({
                    nat: TOption(TInt()),
                    int: TOption(TInt()),
                    bls12_381_fr: TOption(TBls12_381_fr()),
                    bls12_381_g1: TOption(TBls12_381_g1()),
                    bls12_381_g2: TOption(TBls12_381_g2()),
                }),
            )
            .setStorage(
                Record({
                    nat: None(),
                    int: None(),
                    bls12_381_fr: None(),
                    bls12_381_g1: None(),
                    bls12_381_g2: None(),
                }),
            )
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TNat())
                    .code((arg) => [SetValue(ContractStorage().nat, Some(Negate(arg)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep2')
                    .setInputType(TInt())
                    .code((arg) => [SetValue(ContractStorage().int, Some(Negate(arg)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep3')
                    .setInputType(TBls12_381_fr())
                    .code((arg) => [SetValue(ContractStorage().bls12_381_fr, Some(Negate(arg)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep4')
                    .setInputType(TBls12_381_g1())
                    .code((arg) => [SetValue(ContractStorage().bls12_381_g1, Some(Negate(arg)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep5')
                    .setInputType(TBls12_381_g2())
                    .code((arg) => [SetValue(ContractStorage().bls12_381_g2, Some(Negate(arg)))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
