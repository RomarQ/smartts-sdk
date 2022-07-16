import { AddHours, AddMinutes, AddSeconds, ContractStorage } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TInt, TTimestamp } from '../../src/type';

describe('timestamp expressions', () => {
    it('Add seconds', () => {
        const contract = new Contract()
            .setStorageType(TTimestamp())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code((arg) => [SetValue(ContractStorage(), AddSeconds(ContractStorage(), arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Add minutes', () => {
        const contract = new Contract()
            .setStorageType(TTimestamp())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code((arg) => [SetValue(ContractStorage(), AddMinutes(ContractStorage(), arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Add hours', () => {
        const contract = new Contract()
            .setStorageType(TTimestamp())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code((arg) => [SetValue(ContractStorage(), AddHours(ContractStorage(), arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
