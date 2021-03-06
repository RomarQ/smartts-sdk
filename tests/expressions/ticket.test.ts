import {
    ContractStorage,
    CreateTicket,
    GetElementsFromSet,
    GetVariable,
    JoinTicket,
    Nat,
    ReadTicket,
    SetContainsElement,
    SplitTicket,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { RemoveElementFromSet, AddElementToSet, SetValue, NewVariable } from '../../src/statement';
import { TAddress, TBool, TList, TNat, TOption, TPair, TSet, TString, TTicket } from '../../src/type';

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
    it('Read ticket', () => {
        const contract = new Contract()
            .setStorageType(TPair(TPair(TAddress(), TString(), TNat()), TTicket(TString())))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TString())
                    .code((arg) => [
                        NewVariable('ticket', CreateTicket(arg, Nat(10))),
                        SetValue(ContractStorage(), ReadTicket(GetVariable('ticket'))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Split ticket', () => {
        const contract = new Contract()
            .setStorageType(TOption(TPair(TTicket(TString()), TTicket(TString()))))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TString())
                    .code((arg) => [
                        NewVariable('ticket', CreateTicket(arg, Nat(10))),
                        SetValue(ContractStorage(), SplitTicket(GetVariable('ticket'), Nat(2), Nat(8))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Join tickets', () => {
        const contract = new Contract()
            .setStorageType(TOption(TTicket(TString())))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TString())
                    .code((arg) => [
                        NewVariable('ticket1', CreateTicket(arg, Nat(10))),
                        NewVariable('ticket2', CreateTicket(arg, Nat(10))),
                        SetValue(ContractStorage(), JoinTicket(GetVariable('ticket1'), GetVariable('ticket2'))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
