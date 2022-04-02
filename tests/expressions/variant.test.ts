import { Unit, ContractStorage, OpenVariant, Bool, IsVariant, isSome, isNone } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBool, TNat, TOption, TUnit, TVariant } from '../../src/type';

describe('Variant expressions', () => {
    it('Open Variant', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TVariant({ prop1: TNat(), prop2: TUnit() }))
                    .code((arg) => [SetValue(ContractStorage(), OpenVariant(arg, 'prop2'))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Is Some', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TOption(TUnit()))
                    .code((arg) => [SetValue(ContractStorage(), isSome(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Is None', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TOption(TUnit()))
                    .code((arg) => [SetValue(ContractStorage(), isNone(arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Check Variant', () => {
        const contract = new Contract()
            .setStorage(Bool(true))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TVariant({ prop1: TNat(), prop2: TUnit() }))
                    .code((arg) => [SetValue(ContractStorage(), IsVariant(arg, 'prop2'))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
