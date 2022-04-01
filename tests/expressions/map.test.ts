import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { ContractStorage, GetMapEntries, GetMapKeys, GetMapValues } from '../../src/expression';
import { TList, TMap, TNat, TRecord, TString } from '../../src/type';

describe('Map expressions', () => {
    it('GetMapEntries', () => {
        const contract = new Contract()
            .setStorageType(TList(TRecord({ key: TNat(), value: TString() })))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TMap(TNat(), TString()))
                    .code((arg) => [SetValue(ContractStorage(), GetMapEntries(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('GetMapKeys', () => {
        const contract = new Contract()
            .setStorageType(TList(TNat()))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TMap(TNat(), TString()))
                    .code((arg) => [SetValue(ContractStorage(), GetMapKeys(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('GetMapValues', () => {
        const contract = new Contract()
            .setStorageType(TList(TString()))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TMap(TNat(), TString()))
                    .code((arg) => [SetValue(ContractStorage(), GetMapValues(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
