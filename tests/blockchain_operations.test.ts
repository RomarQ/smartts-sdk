import { Address, Nat, Timestamp } from '../src/core/literal';
import { Contract, EntryPoint, Level, Now, Sender, Source } from '../src/core';
import { ContractStorage } from '../src/core/expression';
import { SetValue } from '../src/core/command';
import SmartML from '../src/smartml';

describe('Test compilation of blockchain operations', () => {
    it('Get sender', () => {
        const contract = new Contract({
            initialStorage: Address('tz1'),
            entries: [new EntryPoint('ep1').body(() => [SetValue(ContractStorage(), Sender())])],
        }).toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });
    it('Get source', () => {
        const contract = new Contract({
            initialStorage: Address('tz1'),
            entries: [new EntryPoint('ep1').body(() => [SetValue(ContractStorage(), Source())])],
        }).toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });
    it('Get head level', () => {
        const contract = new Contract({
            initialStorage: Nat(1),
            entries: [new EntryPoint('ep1').body(() => [SetValue(ContractStorage(), Level())])],
        }).toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });
    it('Get head timestamp', () => {
        const contract = new Contract({
            initialStorage: Timestamp(0),
            entries: [new EntryPoint('ep1').body(() => [SetValue(ContractStorage(), Now())])],
        }).toString();

        expect(contract).toMatchSnapshot();

        const michelson = SmartML.compileContract(contract);

        expect(michelson).toMatchSnapshot();
    });
});
