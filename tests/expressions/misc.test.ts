import {
    CallLambda,
    CallView,
    Concat,
    ContractStorage,
    GetSelfAddress,
    Lambda,
    None,
    Not,
    Some,
    String,
} from '../../src/expression';
import { Contract, EntryPoint, OnChainView } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Require, Return, SetValue } from '../../src/statement';
import { TBool, TUnit } from '../../src/type';

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
            .setStorage(None())
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
            .setStorage(None())
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TUnit())
                    .code(() => [
                        SetValue(ContractStorage(), Some(Concat([String('Hello'), String(' '), String('World')]))),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
