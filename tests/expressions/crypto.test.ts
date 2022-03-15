import {
    BLAKE2B,
    Bytes,
    CheckSignature,
    ContractStorage,
    KECCAK,
    Key,
    None,
    SHA256,
    SHA3,
    SHA512,
    Signature,
    Some,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBool, TBytes, TSignature } from '../../src/type';

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
    describe('Signatures', () => {
        it('CheckSignature', () => {
            const contract = new Contract()
                .setStorageType(TBool())
                .addEntrypoint(
                    new EntryPoint('checkSignature')
                        .setInputType(TSignature())
                        .code((signature) => [
                            SetValue(
                                ContractStorage(),
                                CheckSignature(
                                    Key('edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT'),
                                    signature,
                                    Bytes('0x01'),
                                ),
                            ),
                        ]),
                );

            verifyContractCompilationOutput(contract);
        });
    });
});
