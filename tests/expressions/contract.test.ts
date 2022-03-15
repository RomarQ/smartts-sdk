import {
    ContractStorage,
    Transfer,
    GetContract,
    Address,
    Mutez,
    Unit,
    ToContract,
    GetSome,
    GetVariable,
    ToAddress,
    GetSelf,
    ImplicitAccount,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { NewVariable, SetValue } from '../../src/statement';
import { TAddress, TKey_hash, TUnit } from '../../src/type';

describe('Contract expressions', () => {
    it('ToContract', () => {
        const contract = new Contract().addEntrypoint(
            new EntryPoint('entry_point_1').code(() => [
                Transfer(
                    ToContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit()),
                    Mutez(100),
                    Unit(),
                ).send(),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
    it('GetContract', () => {
        const contract = new Contract().addEntrypoint(
            new EntryPoint('entry_point_1').code(() => [
                NewVariable(
                    'contract',
                    GetSome(GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit())),
                ),
                Transfer(GetVariable('contract'), Mutez(100), Unit()).send(),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
    it('ToAddress', () => {
        const contract = new Contract()
            .setStorageType(TAddress())
            .addEntrypoint(
                new EntryPoint('entry_point_1').code(() => [
                    SetValue(ContractStorage(), ToAddress(GetSelf('entry_point_1'))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('ImplicitAccount', () => {
        const contract = new Contract()
            .setStorageType(TUnit())
            .addEntrypoint(
                new EntryPoint('entry_point_1')
                    .setInputType(TKey_hash())
                    .code((argument) => [Transfer(ImplicitAccount(argument), Mutez(0)).send()]),
            );

        verifyContractCompilationOutput(contract);
    });
});
