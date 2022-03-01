import { TNat } from '../../src/type';
import { Nat, ContractStorage, GetVariable, Math } from '../../src/expression';
import { NewVariable, SetValue } from '../../src/statement';
import { Contract, EntryPoint } from '../../src/core';
import { verifyMichelsonOutput } from '../util';

describe('Test (NewVariable) statement', () => {
    it('Declares a variable named (A)', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        NewVariable('A', Math.Add(arg, Nat(2))),
                        SetValue(ContractStorage(), GetVariable('A')),
                    ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});
