import { ContractStorage, GetElementsFromSet, Nat, SetContainsElement } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBool, TList, TNat, TSet } from '../../src/type';

describe('Set expressions', () => {
    it('Get elements', () => {
        const contract = new Contract()
            .setStorageType(TList(TNat()))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TSet(TNat()))
                    .code((arg) => [SetValue(ContractStorage(), GetElementsFromSet(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Contains element', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TSet(TNat()))
                    .code((arg) => [SetValue(ContractStorage(), SetContainsElement(arg, Nat(1)))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
