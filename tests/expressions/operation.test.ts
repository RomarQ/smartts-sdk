import {
    Address,
    GetContract,
    GetOperations,
    Mutez,
    Transfer,
    Unit,
    PrependToList,
    SetDelegate,
    Key_hash,
    Some,
    None,
    CreateContract,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TKey_hash, TNat } from '../../src/type';

describe('Transaction operation', () => {
    it('Build operation (Desugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code((arg) => [
                    SetValue(
                        GetOperations(),
                        PrependToList(
                            GetOperations(),
                            Transfer(GetContract(Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')), Mutez(100), arg),
                        ),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Build operation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    Transfer(GetContract(Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')), Mutez(100)).send(),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Build operation to an originated contract', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TNat())
                    .code((arg) => [
                        Transfer(
                            GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'ep1', TNat()),
                            Mutez(100),
                            arg,
                        ).send(),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});

describe('Delegation operation', () => {
    it('Build operation (Desugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(
                        GetOperations(),
                        PrependToList(
                            GetOperations(),
                            SetDelegate(Some(Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'))),
                        ),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Build operation to set delegator (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TKey_hash()).code((arg) => [SetDelegate(Some(arg)).send()]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Build operation to clear the delegation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetDelegate(None()).send()]));

        verifyContractCompilationOutput(contract);
    });
});

describe('Origination operation', () => {
    it('Build operation (Desugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(
                        GetOperations(),
                        PrependToList(GetOperations(), CreateContract(new Contract(), Unit()).getOperation()),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Build operation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code((arg) => [
                    CreateContract(
                        new Contract(),
                        arg,
                        Mutez(100),
                        Some(Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')),
                    ).send(),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
