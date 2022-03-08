import { ForEachOf, MatchVariant, SetValue } from '../../src/statement';
import { ContractStorage, String } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TList, TString, TVariant } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test Variant statements', () => {
    it('MatchVariant 1', () => {
        const contract = new Contract().setStorage(String('')).addEntrypoint(
            new EntryPoint('ep1').inputType(TVariant({ action1: TString(), action2: TString() })).code((arg) => [
                MatchVariant(arg)
                    .Case('action1', (arg) => [SetValue(ContractStorage(), arg)])
                    .Case('action2', (arg) => [SetValue(ContractStorage(), arg)]),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
    it('MatchVariant 2', () => {
        const contract = new Contract().setStorage(String('')).addEntrypoint(
            new EntryPoint('ep1').inputType(TList(TVariant({ action1: TString(), action2: TString() }))).code((arg) => [
                ForEachOf(arg).Do((iter) => [
                    MatchVariant(iter)
                        .Case('action1', (payload) => [SetValue(ContractStorage(), payload)])
                        .Case('action2', (payload) => [SetValue(ContractStorage(), payload)]),
                ]),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
});
