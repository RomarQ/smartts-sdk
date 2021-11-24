import SmartML from '@smartpy/smartml';
import {
    Contract,
    DefineLocal,
    EntryPoint,
    Equal,
    Flag,
    GetLocal,
    List,
    Mutez,
    Nat,
    String,
    TNat,
    Verify,
} from '../src/core';

describe('Compile Contracts', () => {
    it('Simple 1', () => {
        const contract = new Contract({
            initialStorage: Nat(1),
            entries: [
                new EntryPoint('ep1').body((arg) => [
                    DefineLocal('A', Nat(1)),
                    Verify(Equal(GetLocal('A'), arg), String('Error Message')),
                ]),
            ],
        }).toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });

    it('Simple 2', () => {
        const contract = new Contract({
            initialStorage: List([Nat(1)], TNat),
            entries: [
                new EntryPoint('ep1')
                    .config({ lazy: false })
                    .body((arg) => [
                        DefineLocal('A', Nat(1)),
                        Verify(Equal(GetLocal('A'), arg), String('Error Message')),
                    ]),
            ],
        })
            .config({
                initialBalance: Mutez(100),
                flags: [new Flag('erase-comments')],
            })
            .toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });
});
