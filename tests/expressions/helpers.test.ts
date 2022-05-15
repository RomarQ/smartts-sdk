import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { Address, ContractStorage, String } from '../../src/expression';
import { TBool } from '../../src/type';
import { AddressHelpers, StringHelpers } from '../../src/lib';

describe('Helpers', () => {
    it('StartsWith', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(ContractStorage(), StringHelpers.StartsWith(String('Hello'), String('He'))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('EndsWith', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(ContractStorage(), StringHelpers.EndsWith(String('Hello'), String('lo'))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('IsKT1', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(ContractStorage(), AddressHelpers.IsKT1(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
