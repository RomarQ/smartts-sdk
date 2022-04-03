import { ContractStorage, GetElementsFromSet, Nat } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { AddElementToSet, RemoveElementToSet, SetValue } from '../../src/statement';
import { TList, TNat, TSet } from '../../src/type';

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
    it('Add element', () => {
        const contract = new Contract()
            .setStorageType(TSet(TNat()))
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TNat()).code((arg) => [AddElementToSet(ContractStorage(), arg)]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Remove element', () => {
        const contract = new Contract()
            .setStorageType(TSet(TNat()))
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TNat()).code((arg) => [RemoveElementToSet(ContractStorage(), arg)]),
            );

        verifyContractCompilationOutput(contract);
    });
});
