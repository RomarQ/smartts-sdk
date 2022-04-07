import { ContractStorage } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { RemoveElementFromSet, AddElementToSet } from '../../src/statement';
import { TNat, TSet } from '../../src/type';

describe('Set statements', () => {
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
                new EntryPoint('ep1')
                    .setInputType(TNat())
                    .code((arg) => [RemoveElementFromSet(ContractStorage(), arg)]),
            );

        verifyContractCompilationOutput(contract);
    });
});
