import { ContractStorage, CreateTicket, GetElementsFromSet, Nat, SetContainsElement } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { RemoveElementFromSet, AddElementToSet, SetValue } from '../../src/statement';
import { TBool, TList, TNat, TSet, TString, TTicket } from '../../src/type';

describe('Ticket expressions', () => {
    it('Create a ticket', () => {
        const contract = new Contract()
            .setStorageType(TTicket(TString()))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TString())
                    .code((arg) => [SetValue(ContractStorage(), CreateTicket(arg, Nat(10)))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
