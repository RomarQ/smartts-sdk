import { ContractStorage, Nat, String, Pair, Equal, FirstElement, SecondElement } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Require } from '../../src/statement';

describe('Expressions specific to Pair values', () => {
    it('FirstElement', () => {
        const contract = new Contract()
            .setStorage(Pair(Nat(1), String('A String')))
            .addEntrypoint(new EntryPoint('ep1').code(() => [Require(Equal(FirstElement(ContractStorage()), Nat(1)))]));

        verifyContractCompilationOutput(contract);
    });
    it('SecondElement', () => {
        const contract = new Contract()
            .setStorage(Pair(Nat(1), String('A String')))
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    Require(Equal(SecondElement(ContractStorage()), String('A String'))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
