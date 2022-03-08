import { SetValue, While } from '../../src/statement';
import { ContractStorage, Nat, Comparison, Math } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TNat } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test (While) statement', () => {
    it('Loop while condition is true', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        While(Comparison.LessThanOrEqual(ContractStorage(), arg)).Do([
                            SetValue(ContractStorage(), Math.Add(ContractStorage(), Nat(1))),
                        ]),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
