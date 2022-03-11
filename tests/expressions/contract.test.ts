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
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { NewVariable, SetValue } from '../../src/statement';
import { TAddress, TUnit } from '../../src/type';

describe('Contract expressions', () => {
    it('GetContract', () => {
        const contract = new Contract().addEntrypoint(
            new EntryPoint('entry_point_1').code(() => [
                Transfer(
                    GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit()),
                    Mutez(100),
                    Unit(),
                ).send(),
            ]),
        );

        verifyContractCompilationOutput(contract);
    });
    it('ToContract', () => {
        const contract = new Contract().addEntrypoint(
            new EntryPoint('entry_point_1').code(() => [
                NewVariable(
                    'contract',
                    GetSome(ToContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit())),
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
});
