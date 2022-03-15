import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { CastToNat, ContractStorage, String, IsNat, GetSome, CastToInt, ABS } from '../../src/expression';
import { TInt, TNat } from '../../src/type';

describe('Integer expressions', () => {
    it('IsNat', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code((arg) => [
                        SetValue(ContractStorage(), GetSome(IsNat(arg), String('Could not convert int to nat'))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('CastToNat', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code((arg) => [
                        SetValue(ContractStorage(), CastToNat(arg, String('Could not convert int to nat'))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('CastToInt', () => {
        const contract = new Contract()
            .setStorageType(TInt())
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TNat()).code((arg) => [SetValue(ContractStorage(), CastToInt(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('ABS', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TInt()).code((arg) => [SetValue(ContractStorage(), ABS(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
