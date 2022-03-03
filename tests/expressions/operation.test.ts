import { Address, GetContract, GetOperations, Mutez, Transfer, Unit, AppendToList, SetDelegate, Key_hash, Some, None, CreateContract } from '../../src/expression';
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
                        AppendToList(
                            GetOperations(),
                            Transfer(GetContract(Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')), Mutez(100), arg),
                        ),
                    ),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Build operation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    Transfer(GetContract(Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')), Mutez(100)).send(),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Build operation to an originated contract', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TNat())
                    .code((arg) => [
                        Transfer(
                            GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'ep1', TNat()),
                            Mutez(100),
                            arg,
                        ).send(),
                    ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});

describe('Delegation operation', () => {
    it('Build operation (Desugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code((arg) => [
                    SetValue(
                        GetOperations(),
                        AppendToList(
                            GetOperations(),
                            SetDelegate(Some(Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"))),
                        ),
                    ),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Build operation to set delegator (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TKey_hash()).code((arg) => [
                    SetDelegate(Some(arg)).send(),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Build operation to clear the delegation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetDelegate(None()).send()]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});

describe('Origination operation', () => {
    it('Build operation (Desugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code((arg) => [
                    SetValue(
                        GetOperations(),
                        AppendToList(
                            GetOperations(),
                            CreateContract(new Contract(), Unit()).getOperation(),
                        ),
                    ),
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
    it('Build operation (Sugared version)', () => {
        const contract = new Contract()
            .setStorage(Unit())
            .addEntrypoint(
                new EntryPoint('ep1').code((arg) => [
                    CreateContract(new Contract(), arg, Mutez(100), Some(Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"))).send()
                ]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});
