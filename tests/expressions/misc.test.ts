import { CallLambda, ContractStorage, Lambda } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Require, Return } from '../../src/statement';
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
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyContractCompilationOutput(contract);
    });
});
