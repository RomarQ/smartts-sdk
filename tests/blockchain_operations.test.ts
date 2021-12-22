import { Address, ChainID, Nat, Timestamp } from '../src/core/literal';
import { GetChainID, Contract, EntryPoint, GetCurrentTime, GetLevel, GetSender, GetSource } from '../src/core';
import { ContractStorage } from '../src/core/expression';
import { SetValue } from '../src/core/command';
import SmartML from '../src/smartml';

const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // No errors expected
    expect(JSON.stringify(michelson).includes('ERROR')).toBeFalsy();
    // Check snapshot
    expect(michelson).toMatchSnapshot();
};

describe('Test compilation of blockchain operations', () => {
    it('Get sender', () => {
        const contract = new Contract({
            initialStorage: Address('tz1'),
            entries: [new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetSender())])],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get source', () => {
        const contract = new Contract({
            initialStorage: Address('tz1'),
            entries: [new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetSource())])],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get head level', () => {
        const contract = new Contract({
            initialStorage: Nat(1),
            entries: [new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetLevel())])],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get head timestamp', () => {
        const contract = new Contract({
            initialStorage: Timestamp(0),
            entries: [new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetCurrentTime())])],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get chain identifier', () => {
        const contract = new Contract({
            initialStorage: ChainID('0x00'),
            entries: [new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetChainID())])],
        }).toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});
