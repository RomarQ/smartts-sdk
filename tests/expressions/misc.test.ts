import {
    Bytes,
    CallLambda,
    CallView,
    Concat,
    ContractStorage,
    GetSelfAddress,
    Lambda,
    List,
    Nat,
    Not,
    Pair,
    SizeOf,
    Set,
    String,
    Map,
} from '../../src/expression';
import { Contract, EntryPoint, OnChainView } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Require, Return, SetValue } from '../../src/statement';
import { TBool, TBytes, TNat, TOption, TPair, TString, TUnit } from '../../src/type';

describe('Misc expressions', () => {
    it('CallLambda', () => {
        const contract = new Contract()
            .setStorage(
                Lambda()
                    .setInputType(TBool())
                    .code((argument) => [Return(argument)]),
            )
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TBool())
                    .code((arg) => [Require(CallLambda(ContractStorage(), arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('CallView', () => {
        const contract = new Contract()
            .setStorageType(TOption(TBool()))
            .addView(new OnChainView('some_view').setInputType(TBool()).code((argument) => [Return(Not(argument))]))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TBool())
                    .code((arg) => [
                        SetValue(ContractStorage(), CallView('some_view', GetSelfAddress(), arg, TBool())),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
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
                                Concat([String('Hello'), String(' '), String('World')]),
                                Concat([Bytes('0x01'), Bytes('0x02')]),
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
