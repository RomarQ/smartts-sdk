import { For, SetValue } from '../../src/statement';
import { Add, ContractStorage, Nat } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TNat } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test (For) statement', () => {
    it('Sum values from 0 to 10 (Inclusive)', () => {
        const contract = new Contract()
            .setStorage(Nat(0))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TNat())
                    .code((arg) => [
                        For(Nat(0), arg, Nat(1)).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
