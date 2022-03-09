import { For, NewVariable, SetValue } from '../../src/statement';
import { Add, ContractStorage, GetVariable, List, Nat, PrependToList } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { TNat, TUnit } from '../../src/type';
import { verifyContractCompilationOutput } from '../util';

describe('Test (For) statement', () => {
    it('Sum values from 0 to 10 (Inclusive)', () => {
        const contract = new Contract()
            .setStorage(Nat(0))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TNat())
                    .code((arg) => [
                        For(Nat(0), arg, Nat(1)).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Append iterator to a list', () => {
        const contract = new Contract().setStorage(List([])).addEntrypoint(
            new EntryPoint('entry_point_1').setInputType(TUnit()).code(() => [
                NewVariable('some_list', List([])),
                For(Nat(0) /* From */, Nat(3) /* To */, Nat(1) /* Incrementor */).Do((i) => [
                    SetValue(GetVariable('some_list'), PrependToList(GetVariable('some_list'), i)),
                ]),
                // some_list: List([Nat(1), Nat(2), Nat(3)])
                SetValue(ContractStorage(), GetVariable('some_list')),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
});
