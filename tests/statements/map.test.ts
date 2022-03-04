import { DeleteMapEntry } from '../../src/statement';
import { Big_map, Map, ContractStorage, Nat, String } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TString } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test Map statements', () => {
    it('DeleteMapEntry on Map', () => {
        const contract = new Contract()
            .setStorage(Map([[String('some_key'), Nat(1)]]))
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TString()).code((arg) => [DeleteMapEntry(ContractStorage(), arg)]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('DeleteMapEntry on BigMap', () => {
        const contract = new Contract()
            .setStorage(Big_map([[String('some_key'), Nat(1)]]))
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TString()).code((arg) => [DeleteMapEntry(ContractStorage(), arg)]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});
