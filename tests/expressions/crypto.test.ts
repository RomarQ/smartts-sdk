import { BLAKE2B, ContractStorage, KECCAK, None, SHA256, SHA3, SHA512, Some } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBytes } from '../../src/type';

describe('Crypto expressions', () => {
    describe('Hashing', () => {
        it('BLACK2B', () => {
            const contract = new Contract()
                .setStorage(None())
                .addEntrypoint(
                    new EntryPoint('hash_bytes_BLACK2B')
                        .setInputType(TBytes())
                        .code((arg) => [SetValue(ContractStorage(), Some(BLAKE2B(arg)))]),
                );

            verifyContractCompilationOutput(contract);
        });
        it('KECCAK', () => {
            const contract = new Contract()
                .setStorage(None())
                .addEntrypoint(
                    new EntryPoint('hash_bytes_KECCAK')
                        .setInputType(TBytes())
                        .code((arg) => [SetValue(ContractStorage(), Some(KECCAK(arg)))]),
                );

            verifyContractCompilationOutput(contract);
        });
        it('SHA256', () => {
            const contract = new Contract()
                .setStorage(None())
                .addEntrypoint(
                    new EntryPoint('hash_bytes_SHA256')
                        .setInputType(TBytes())
                        .code((arg) => [SetValue(ContractStorage(), Some(SHA256(arg)))]),
                );

            verifyContractCompilationOutput(contract);
        });
        it('SHA512', () => {
            const contract = new Contract()
                .setStorage(None())
                .addEntrypoint(
                    new EntryPoint('hash_bytes_SHA512')
                        .setInputType(TBytes())
                        .code((arg) => [SetValue(ContractStorage(), Some(SHA512(arg)))]),
                );

            verifyContractCompilationOutput(contract);
        });
        it('SHA3', () => {
            const contract = new Contract()
                .setStorage(None())
                .addEntrypoint(
                    new EntryPoint('hash_bytes_SHA3')
                        .setInputType(TBytes())
                        .code((arg) => [SetValue(ContractStorage(), Some(SHA3(arg)))]),
                );

            verifyContractCompilationOutput(contract);
        });
    });
});
