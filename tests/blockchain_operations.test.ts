import { Address, ChainID, Nat, Timestamp } from '../src/core/literal';
import { GetChainID, Contract, EntryPoint, GetCurrentTime, GetLevel, GetSender, GetSource } from '../src/core';
import { ContractStorage } from '../src/core/expression';
import { SetValue } from '../src/core/command';
import { verifyMichelsonOutput } from './util';

describe('Test compilation of blockchain operations', () => {
    it('Get sender', () => {
        const contract = new Contract()
            .setStorage(Address('tz1'))
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetSender())]))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get source', () => {
        const contract = new Contract()
            .setStorage(Address('tz1'))
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetSource())]))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get head level', () => {
        const contract = new Contract()
            .setStorage(Nat(1))
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetLevel())]))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get head timestamp', () => {
        const contract = new Contract()
            .setStorage(Timestamp(0))
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetCurrentTime())]))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
    it('Get chain identifier', () => {
        const contract = new Contract()
            .setStorage(ChainID('0x00'))
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), GetChainID())]))
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
});
