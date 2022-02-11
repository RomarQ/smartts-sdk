import SmartML from '../../src/compiler';
import { If, SetValue } from '../../src/statement';
import { ContractStorage, GreaterThanOrEqual, Nat } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TNat } from '../../src/type';

const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // No errors expected
    expect(JSON.stringify(michelson).includes('ERROR')).toBeFalsy();
    // Check snapshot
    expect(michelson).toMatchSnapshot();
};

describe('Test (If) statement', () => {
    it('Without (Else)', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [If(GreaterThanOrEqual(arg, Nat(5)), [SetValue(ContractStorage(), arg)])]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Without (Else) - [chaining version]', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [If(GreaterThanOrEqual(arg, Nat(5))).Then([SetValue(ContractStorage(), arg)])]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
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
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('With (Then) and (Else) - [chaining version]', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TNat()).code((arg) => [
                    If(GreaterThanOrEqual(arg, Nat(5)))
                        .Then([SetValue(ContractStorage(), arg)])
                        .Else([SetValue(ContractStorage(), Nat(5))]),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});
