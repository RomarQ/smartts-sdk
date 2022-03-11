import { CallLambda, ContractStorage, Lambda, Nat, String, GreaterThan } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { If, Return, SetValue } from '../../src/statement';
import { TNat, TString } from '../../src/type';

describe('Lambda expressions', () => {
    it('CallLambda', () => {
        const lambda = Lambda()
            .setInputType(TNat())
            .code((arg) => [
                If(GreaterThan(arg, Nat(2)))
                    .Then([Return(String('YES'))])
                    .Else([Return(String('NO'))]),
            ]);

        const contract = new Contract()
            .setStorageType(TString())
            .addEntrypoint(
                new EntryPoint('entry_point_1')
                    .setInputType(TNat())
                    .code((arg) => [SetValue(ContractStorage(), CallLambda(lambda, arg))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
