import { CallLambda, CallView, ContractStorage, GetSelfAddress, Lambda, None, Not } from '../../src/expression';
import { Contract, EntryPoint, OnChainView } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Require, Return, SetValue } from '../../src/statement';
import { TBool } from '../../src/type';

describe('Misc expressions', () => {
    it('CallLambda', () => {
        const contract = new Contract()
            .setStorage(
                Lambda()
                    .inputType(TBool())
                    .code((argument) => [Return(argument)]),
            )
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TBool()).code((arg) => [Require(CallLambda(ContractStorage(), arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('CallView', () => {
        const contract = new Contract()
            .setStorage(None())
            .addView(new OnChainView('some_view').inputType(TBool()).code((argument) => [Return(Not(argument))]))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .inputType(TBool())
                    .code((arg) => [
                        SetValue(ContractStorage(), CallView('some_view', GetSelfAddress(), arg, TBool())),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
