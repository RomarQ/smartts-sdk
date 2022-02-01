import SmartML from '../../src/smartml';
import { ForEachOf, SetValue } from '../../src/core/command';
import { Add, ContractStorage } from '../../src/core/expression';
import { Contract, EntryPoint } from '../../src/core';
import { Nat } from '../../src/core/literal';
import { TList, TNat } from '../../src/core/type';

const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // No errors expected
    expect(JSON.stringify(michelson).includes('ERROR')).toBeFalsy();
    // Check snapshot
    expect(michelson).toMatchSnapshot();
};

describe('Test (ForEach) statement', () => {
    it('Sum values of a list', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TList(TNat))
                    .code((arg) => [
                        ForEachOf(arg).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]),
                    ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});