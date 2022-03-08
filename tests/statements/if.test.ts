import { If, SetValue } from '../../src/statement';
import { ContractStorage, GreaterThanOrEqual, Nat } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TNat } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test (If) statement', () => {
    it('Without (Else)', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [If(GreaterThanOrEqual(arg, Nat(5)), [SetValue(ContractStorage(), arg)])]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Without (Else) - [chaining version]', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [If(GreaterThanOrEqual(arg, Nat(5))).Then([SetValue(ContractStorage(), arg)])]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('With (Then) and (Else)', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        If(
                            GreaterThanOrEqual(arg, Nat(5)),
                            [SetValue(ContractStorage(), arg)],
                            [SetValue(ContractStorage(), Nat(5))],
                        ),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('With (Then) and (Else) - [chaining version]', () => {
        const contract = new Contract().setStorage(Nat(1)).addEntrypoint(
            new EntryPoint('ep1').inputType(TNat()).code((arg) => [
                If(GreaterThanOrEqual(arg, Nat(5)))
                    .Then([SetValue(ContractStorage(), arg)])
                    .Else([SetValue(ContractStorage(), Nat(5))]),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
});
