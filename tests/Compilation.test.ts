import { TBool, TList, TNat, TOption } from '../src/type';
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
    CallView,
    GetSelfAddress,
    GetSome,
} from '../src/expression';
import { Contract, EntryPoint, Flag, OnChainView } from '../src/core';
import { FailWith, If, NewVariable, Require, Return, SetValue } from '../src/statement';
import { verifyContractCompilationOutput, verifyValueCompilationOutput } from './util';

describe('Compile Lambdas', () => {
    it('A Lambda that returns the argument', () => {
        const lambda = Lambda().code((arg) => [
            If(Equal(arg, String('TEST')))
                .Then([Return(arg)])
                .Else([FailWith(arg)]),
        ]);

        verifyValueCompilationOutput(lambda);
    });
    it('A Lambda that returns "YES" if the argument is greater than or equal to Nat(10), returns "NO" otherwise', () => {
        const lambda = Lambda().code((arg) => [
            If(GreaterThanOrEqual(arg, Nat(1)))
                .Then([Return(String('YES'))])
                .Else([Return(String('NO'))]),
        ]);

        verifyValueCompilationOutput(lambda);
    });
    it('A', () => {
        verifyValueCompilationOutput(Nat(1) as any);
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
                    .setInputType(TList(TNat()))
                    .code((arg) => [
                        // Define a variable named "some_address"
                        NewVariable('some_address', Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT')),
                        // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                        Require(Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
                        // Replace the storage value with entry point argument
                        SetValue(ContractStorage(), arg),
                    ]),
            )
            .addView(new OnChainView('view').setInputType(TBool()).code((argument) => [Return(argument)]));

        verifyContractCompilationOutput(contract);
    });

    it('Contract 2', () => {
        const contract = new Contract()
            // Set initial storage
            .setStorage(Nat(0))
            // Add an entrypoint named "entry_point_1"
            .addEntrypoint(
                new EntryPoint('entry_point_1')
                    // Set the type of the entrypoint argument
                    .setInputType(TBool())
                    // Specify the entrypoint logic
                    .code((argument) => [
                        // Update contract storage
                        SetValue(
                            ContractStorage(),
                            GetSome(CallView('negate', GetSelfAddress(), argument), String('Could not call view')),
                        ),
                    ]),
            )
            .addView(
                new OnChainView('negate').setInputType(TBool()).code((argument) => [
                    // Convert a boolean value to a nat value
                    If(argument)
                        .Then([Return(Nat(1))])
                        .Else([Return(Nat(0))]),
                ]),
            );

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
