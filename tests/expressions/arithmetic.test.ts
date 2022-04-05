import {
    Add,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2,
    ContractStorage,
    EuclideanDivision,
    Int,
    Mod,
    Multiply,
    Mutez,
    Nat,
    None,
    Record,
    ShiftLeft,
    ShiftRight,
    Some,
    Subtract,
    Timestamp,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import {
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TInt,
    TMutez,
    TNat,
    TOption,
    TPair,
    TRecord,
} from '../../src/type';

describe('Arithmetic expressions', () => {
    it('EuclideanDivision', () => {
        const contract = new Contract()
            .setStorageType(TOption(TPair(TNat(), TNat())))
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), EuclideanDivision(Nat(13), Nat(3)))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Mod', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), Mod(Nat(13), Nat(3)))]));

        verifyContractCompilationOutput(contract);
    });
    it('ShiftLeft', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), ShiftLeft(Nat(13), Nat(3)))]));

        verifyContractCompilationOutput(contract);
    });
    it('ShiftRight', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetValue(ContractStorage(), ShiftRight(Nat(13), Nat(3)))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('Addition', () => {
        const contract = new Contract()
            .setStorage(
                Record({
                    nat: None(),
                    int: None(),
                    mutez: None(),
                    bls12_381_fr: None(),
                    bls12_381_g1: None(),
                    bls12_381_g2: None(),
                }),
            )
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetValue(ContractStorage().nat, Some(Add(Nat(1), Nat(1))))]),
            )
            .addEntrypoint(
                new EntryPoint('ep2').code(() => [SetValue(ContractStorage().int, Some(Add(Int(1), Int(1))))]),
            )
            .addEntrypoint(
                new EntryPoint('ep3').code(() => [SetValue(ContractStorage().mutez, Some(Add(Mutez(1), Mutez(1))))]),
            )
            .addEntrypoint(
                new EntryPoint('ep4').code(() => [
                    SetValue(ContractStorage().bls12_381_fr, Some(Add(Bls12_381_fr(1), Bls12_381_fr(1)))),
                ]),
            )
            .addEntrypoint(
                new EntryPoint('ep5').code(() => [
                    SetValue(
                        ContractStorage().bls12_381_g1,
                        Some(
                            Add(
                                Bls12_381_g1(
                                    '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
                                ),
                                Bls12_381_g1(
                                    '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
                                ),
                            ),
                        ),
                    ),
                ]),
            )
            .addEntrypoint(
                new EntryPoint('ep6').code(() => [
                    SetValue(
                        ContractStorage().bls12_381_g2,
                        Some(
                            Add(
                                Bls12_381_g2(
                                    '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
                                ),
                                Bls12_381_g2(
                                    '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
                                ),
                            ),
                        ),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });

    it('Subtraction', () => {
        const contract = new Contract()
            .setStorageType(
                TRecord({
                    nat: TInt(),
                    int: TInt(),
                    mutez: TOption(TMutez()),
                    timestamp: TInt(),
                }),
            )
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetValue(ContractStorage().nat, Subtract(Nat(1), Nat(1)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep2').code(() => [SetValue(ContractStorage().int, Subtract(Int(1), Int(1)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep3').code(() => [SetValue(ContractStorage().mutez, Subtract(Mutez(1), Mutez(1)))]),
            )
            .addEntrypoint(
                new EntryPoint('ep4').code(() => [
                    SetValue(ContractStorage().timestamp, Subtract(Timestamp(1), Timestamp(1))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });

    it('Multiplication', () => {
        const contract = new Contract()
            .setStorageType(
                TRecord({
                    nat: TOption(TNat()),
                    int: TOption(TInt()),
                    mutez: TOption(TMutez()),
                    bls12_381_fr: TOption(TBls12_381_fr()),
                    bls12_381_g1: TOption(TBls12_381_g1()),
                    bls12_381_g2: TOption(TBls12_381_g2()),
                }),
            )
            .setStorage(
                Record({
                    nat: None(),
                    int: None(),
                    mutez: None(),
                    bls12_381_fr: None(),
                    bls12_381_g1: None(),
                    bls12_381_g2: None(),
                }),
            )
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [SetValue(ContractStorage().nat, Some(Multiply(Nat(1), Nat(1))))]),
            )
            .addEntrypoint(
                new EntryPoint('ep2').code(() => [
                    SetValue(ContractStorage().int, Some(Multiply(Nat(1), Int(1)))),
                    SetValue(ContractStorage().int, Some(Multiply(Int(1), Int(1)))),
                ]),
            )
            .addEntrypoint(
                new EntryPoint('ep3').code(() => [SetValue(ContractStorage().mutez, Some(Multiply(Mutez(1), Nat(1))))]),
            )
            .addEntrypoint(
                new EntryPoint('ep4').code(() => [
                    SetValue(ContractStorage().bls12_381_fr, Some(Multiply(Nat(1), Bls12_381_fr(1)))),
                    SetValue(ContractStorage().bls12_381_fr, Some(Multiply(Int(1), Bls12_381_fr(1)))),
                    SetValue(ContractStorage().bls12_381_fr, Some(Multiply(Bls12_381_fr(1), Bls12_381_fr(1)))),
                ]),
            )
            .addEntrypoint(
                new EntryPoint('ep5').code(() => [
                    SetValue(
                        ContractStorage().bls12_381_g1,
                        Some(
                            Multiply(
                                Bls12_381_g1(
                                    '0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28',
                                ),
                                Bls12_381_fr(1),
                            ),
                        ),
                    ),
                ]),
            )
            .addEntrypoint(
                new EntryPoint('ep6').code(() => [
                    SetValue(
                        ContractStorage().bls12_381_g2,
                        Some(
                            Multiply(
                                Bls12_381_g2(
                                    '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa',
                                ),
                                Bls12_381_fr(1),
                            ),
                        ),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
