import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { ContractStorage, Or, Nat, Bool, Equal, And, Xor } from '../../src/expression';
import { TBool, TInt, TNat } from '../../src/type';

describe('Integer expressions', () => {
    it('Or', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code(() => [SetValue(ContractStorage(), Or(Equal(Or(Nat(1), Nat(0)), Nat(1)), Bool(false)))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('And', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code(() => [SetValue(ContractStorage(), And(Equal(And(Nat(1), Nat(0)), Nat(1)), Bool(false)))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Xor', () => {
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TInt())
                    .code(() => [SetValue(ContractStorage(), Xor(Equal(Xor(Nat(1), Nat(0)), Nat(1)), Bool(false)))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
