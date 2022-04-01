import { Bytes, Concat, ContractStorage, List, Nat, Pair, SizeOf, Set, String, Map } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBytes, TNat, TPair, TString, TUnit } from '../../src/type';

describe('Misc expressions', () => {
    it('Concat', () => {
        const contract = new Contract()
            .setStorageType(TPair(TString(), TBytes()))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TUnit())
                    .code(() => [
                        SetValue(
                            ContractStorage(),
                            Pair(
                                Concat(List([String('Hello'), String(' '), String('World')])),
                                Concat(List([Bytes('0x01'), Bytes('0x02')])),
                            ),
                        ),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('SizeOf', () => {
        const contract = new Contract()
            .setStorageType(TNat())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(ContractStorage(), SizeOf(String('Hello'))),
                    SetValue(ContractStorage(), SizeOf(Bytes('0x01'))),
                    SetValue(ContractStorage(), SizeOf(List([Nat(1)]))),
                    SetValue(ContractStorage(), SizeOf(Set([Nat(1)]))),
                    SetValue(ContractStorage(), SizeOf(Map([[Nat(1), Nat(2)]]))),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
