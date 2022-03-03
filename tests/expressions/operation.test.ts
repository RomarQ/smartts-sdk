import { Address, GetContract, GetOperations, Mutez, Transfer, Unit, AppendToList } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TNat } from '../../src/type';

describe('Test operation expressions', () => {
    it('Build a transfer operation (Desugared)', () => {
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
    it('Send transfer (Sugared)', () => {
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
    it('Send transfer to originated contract', () => {
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
