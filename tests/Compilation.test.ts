import { TList, TNat, TOption } from '../src/type';
import {
    Address,
    List,
    Nat,
    String,
    None,
    Record,
    Some,
    Unit,
    ContractStorage,
    Equal,
    GreaterThanOrEqual,
    GetVariable,
    GetSender,
    Lambda,
    Mutez,
} from '../src/expression';
import { Contract, EntryPoint, Flag, OnChainView } from '../src/core';
import { FailWith, If, NewVariable, Require, Return, SetValue } from '../src/statement';
import { verifyContractCompilationOutput, verifyLambdaCompilationOutput } from './util';

describe('Compile Lambdas', () => {
    it('A Lambda that returns the argument', () => {
        const lambda = Lambda().code((arg) => [
            If(Equal(arg, String('TEST')))
                .Then([Return(arg)])
                .Else([FailWith(arg)]),
        ]);

        verifyLambdaCompilationOutput(lambda);
    });
    it(' A Lambda that returns "YES" if the argument is greater than or equal to Nat(10), returns "NO" otherwise', () => {
        const lambda = Lambda().code((arg) => [
            If(GreaterThanOrEqual(arg, Nat(1)))
                .Then([Return(String('YES'))])
                .Else([Return(String('NO'))]),
        ]);

        verifyLambdaCompilationOutput(lambda);
    });
});

describe('Compile Contract', () => {
    it('Contract 1', () => {
        const contract = new Contract()
            .setStorageType(TList(TNat()))
            .setStorage(List([]))
            .setConfig({
                initialBalance: Mutez(100),
                flags: [new Flag('erase-comments')],
            })
            .addEntrypoint(
                new EntryPoint('ep1')
                    .config({ lazy: false })
                    .inputType(TList(TNat()))
                    .code((arg) => [
                        // Define a variable named "some_address"
                        NewVariable('some_address', Address('tz1')),
                        // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                        Require(Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
                        // Replace the storage value with entry point argument
                        SetValue(ContractStorage(), arg),
                    ]),
            )
            .addView(new OnChainView('view').code((argument) => [Return(argument)]));
        verifyContractCompilationOutput(contract);
    });

    it('Storage (Unit)', () => {
        const contract = new Contract().setStorage(Unit());

        verifyContractCompilationOutput(contract);
    });

    it('Storage (Some)', () => {
        const contract = new Contract().setStorage(Some(Nat(1)));

        verifyContractCompilationOutput(contract);
    });
    it('Storage (None)', () => {
        const contract = new Contract().setStorageType(TOption(TNat())).setStorage(None());

        verifyContractCompilationOutput(contract);
    });

    it('Storage (Record)', () => {
        const contract = new Contract().setStorage(
            Record({
                testField1: Nat(1),
                testField2: List([String('Hello World')]),
            }),
        );

        verifyContractCompilationOutput(contract);
    });
});
