import { Unit, ContractStorage, OpenVariant, Nat, Bool, IsVariant } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TNat, TUnit, TVariant } from '../../src/type';

describe('Variant expressions', () => {
    it('Open Variant', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TVariant({ prop1: TNat(), prop2: TUnit() }))
                    .code((arg) => [SetValue(ContractStorage(), OpenVariant(arg, 'prop2'))]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Check Variant', () => {
        const contract = new Contract()
            .setStorage(Bool(true))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TVariant({ prop1: TNat(), prop2: TUnit() }))
                    .code((arg) => [SetValue(ContractStorage(), IsVariant(arg, 'prop2'))]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});
