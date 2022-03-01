import { TBool, TList, TNat, TOption, TString } from '../src/type';
import {
    Address,
    Bool,
    List,
    Mutez,
    Nat,
    String,
    None,
    Record,
    Some,
    Unit,
    ContractStorage,
    Comparison,
    GetVariable,
    GetSender,
    Lambda,
} from '../src/expression';
import { Contract, EntryPoint, Flag } from '../src/core';
import { FailWith, If, NewVariable, Require, Return, SetValue } from '../src/statement';
import { verifyContractCompilationOutput, verifyLambdaCompilationOutput } from './util';

describe('Compile Lambdas', () => {
    it('Lambda that returns the argument', () => {
        const lambda = Lambda(TString())
            .code((arg) => [
                If(Comparison.Equal(arg, String('TEST')))
                    .Then([Return(arg)])
                    .Else([FailWith(arg)]),
            ])
            .toString();

        expect(lambda).toMatchSnapshot();
        verifyLambdaCompilationOutput(lambda);
    });
});

describe('Compile Contracts', () => {
    it('Simple 1', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        NewVariable('A', Nat(1)),
                        Require(Comparison.Equal(GetVariable('A'), arg), String('Debug Message')),
                    ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });

    it('Simple 2', () => {
        const contract = new Contract()
            .setStorage(List([Nat(1)]))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .config({ lazy: false })
                    .inputType(TBool())
                    .code((arg) => [
                        NewVariable('A', Bool(false)),
                        Require(Comparison.Equal(GetVariable('A'), arg), String('Debug Message')),
                    ]),
            )
            .setConfig({
                initialBalance: Mutez(100),
                flags: [new Flag('erase-comments')],
            })
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });

    it('Simple 3', () => {
        const contract = new Contract()
            .setStorageType(TList(TNat()))
            .setStorage(List([]))
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TList(TNat())).code((arg) => [
                    // Define a variable named "some_address"
                    NewVariable('some_address', Address('tz1')),
                    // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                    Require(Comparison.Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
                    // Replace the storage value with entry point argument
                    SetValue(ContractStorage(), arg),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });

    it('Storage (Unit)', () => {
        const contract = new Contract().setStorage(Unit()).toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });

    it('Storage (Some)', () => {
        const contract = new Contract().setStorage(Some(Nat(1))).toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Storage (None)', () => {
        const contract = new Contract().setStorageType(TOption(TNat())).setStorage(None()).toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });

    it('Storage (Record)', () => {
        const contract = new Contract()
            .setStorage(
                Record({
                    testField1: Nat(1),
                    testField2: List([String('Hello World')]),
                }),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});
