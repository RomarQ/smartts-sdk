import { TBool, TNat } from '../src/core/type';
import { Address, Bool, List, Mutez, Nat, String } from '../src/core/literal';
import { Contract, EntryPoint, Flag, GetSender } from '../src/core';
import { ContractStorage, Equal, GetLocal } from '../src/core/expression';
import { DefineVar, Require, SetValue } from '../src/core/command';
import SmartML from '../src/smartml';

const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // No errors expected
    expect(JSON.stringify(michelson).includes('ERROR')).toBeFalsy();
    // Check snapshot
    expect(michelson).toMatchSnapshot();
};

describe('Compile Contracts', () => {
    it('Simple 1', () => {
        const contract = new Contract({
            initialStorage: Nat(1),
            entries: [
                new EntryPoint('ep1')
                    .inputType(TNat)
                    .code((arg) => [
                        DefineVar('A', Nat(1)),
                        Require(Equal(GetLocal('A'), arg), String('Error Message')),
                    ]),
            ],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Simple 2', () => {
        const contract = new Contract({
            initialStorage: List([Nat(1)], TNat),
            entries: [
                new EntryPoint('ep1')
                    .config({ lazy: false })
                    .inputType(TBool)
                    .code((arg) => [
                        DefineVar('A', Bool(false)),
                        Require(Equal(GetLocal('A'), arg), String('Error Message')),
                    ]),
            ],
        })
            .config({
                initialBalance: Mutez(100),
                flags: [new Flag('erase-comments')],
            })
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });

    it('Simple 3', () => {
        const contract = new Contract({
            initialStorage: List([], TNat),
            entries: [
                new EntryPoint('ep1').inputType(TNat).code((arg) => [
                    // Define a variable named "some_address"
                    DefineVar('some_address', Address('tz1')),
                    // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                    Require(Equal(GetLocal('some_address'), GetSender()), String('Not Admin!')),
                    // Replace the storage value with entry point argument
                    SetValue(ContractStorage(), arg),
                ]),
            ],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});
