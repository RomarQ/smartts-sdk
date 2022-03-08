import { ForEachOf, SetValue } from '../../src/statement';
import { Add, ContractStorage, Nat } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TList, TNat } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test (ForEach) statement', () => {
    it('Sum values of a list', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TList(TNat()))
                    .code((arg) => [
                        ForEachOf(arg).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
