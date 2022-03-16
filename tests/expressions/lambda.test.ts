import {
    CallLambda,
    ContractStorage,
    Lambda,
    Nat,
    String,
    GreaterThan,
    GetVariable,
    FirstElement,
    SecondElement,
    Add,
    Int,
    Subtract,
    AsType,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput, verifyValueCompilationOutput } from '../util';
import { If, MatchVariant, NewVariable, Return, SetValue } from '../../src/statement';
import { TInt, TLambda, TNat, TPair, TString, TUnknown, TVariant } from '../../src/type';
import { LineInfo } from '../../src/misc/utils';

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
    it('Lambda with variant', () => {
        const lambda = Lambda()
            .setInputType(
                TVariant({
                    add: TPair(TInt(), TInt()),
                    subtract: TPair(TInt(), TInt()),
                }),
            )
            .code((arg) => [
                NewVariable('result', Int(0)),
                MatchVariant(arg)
                    .Case('add', (add_arg) => [
                        SetValue(GetVariable('result'), Add(FirstElement(add_arg), SecondElement(add_arg))),
                    ])
                    .Case('subtract', (subtract_arg) => [
                        SetValue(
                            GetVariable('result'),
                            Subtract(FirstElement(subtract_arg), SecondElement(subtract_arg)),
                        ),
                    ]),
                Return(GetVariable('result')),
            ]);

        verifyValueCompilationOutput(lambda);
    });
});
