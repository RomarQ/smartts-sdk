import { TBool, TList, TNat, TOption } from '../src/type';
import {
    Address,
    Bool,
    List,
    Mutez,
    Nat,
    None,
    Record,
    Some,
    String,
    Unit,
    ContractStorage,
    Equal,
    GetLocal,
    GetSender,
} from '../src/expression';
import { Contract, EntryPoint, Flag } from '../src/core';
import { DefineVar, Require, SetValue } from '../src/statement';
import { verifyMichelsonOutput } from './util';

describe('Compile Contracts', () => {
    it('Simple 1', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        DefineVar('A', Nat(1)),
                        Require(Equal(GetLocal('A'), arg), String('Debug Message')),
                    ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Simple 2', () => {
        const contract = new Contract()
            .setStorage(List([Nat(1)]))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .config({ lazy: false })
                    .inputType(TBool())
                    .code((arg) => [
                        DefineVar('A', Bool(false)),
                        Require(Equal(GetLocal('A'), arg), String('Debug Message')),
                    ]),
            )
            .setConfig({
                initialBalance: Mutez(100),
                flags: [new Flag('erase-comments')],
            })
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Simple 3', () => {
        const contract = new Contract()
            .setStorageType(TList(TNat()))
            .setStorage(List([]))
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TList(TNat())).code((arg) => [
                    // Define a variable named "some_address"
                    DefineVar('some_address', Address('tz1')),
                    // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                    Require(Equal(GetLocal('some_address'), GetSender()), String('Not Admin!')),
                    // Replace the storage value with entry point argument
                    SetValue(ContractStorage(), arg),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Storage (Unit)', () => {
        const contract = new Contract().setStorage(Unit()).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Storage (Some)', () => {
        const contract = new Contract().setStorage(Some(Nat(1))).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Storage (None)', () => {
        const contract = new Contract().setStorageType(TOption(TNat())).setStorage(None()).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
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
        verifyMichelsonOutput(contract);
    });
});
