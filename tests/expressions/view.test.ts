import {
    CallLambda,
    CallView,
    ContractStorage,
    GetSelfAddress,
    GreaterThan,
    Lambda,
    Nat,
    String,
} from '../../src/expression';
import { Contract, EntryPoint, OnChainView } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { If, Return, SetValue } from '../../src/statement';
import { TNat, TOption, TString } from '../../src/type';

describe('View expressions', () => {
    it('CallView', () => {
        const lambda = Lambda()
            .setInputType(TNat())
            .code((arg) => [
                If(GreaterThan(arg, Nat(2)))
                    .Then([Return(String('YES'))]) // Return "YES" if true
                    .Else([Return(String('NO'))]), // Return "NO" if false
            ]);

        const contract = new Contract()
            .setStorageType(TOption(TString()))
            .addView(
                new OnChainView('some_view')
                    .setInputType(TNat())
                    .code((argument) => [Return(CallLambda(lambda, argument))]),
            )
            .addEntrypoint(
                new EntryPoint('entry_point_1').code((arg) => [
                    SetValue(ContractStorage(), CallView('some_view', GetSelfAddress(), arg, TString())),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
