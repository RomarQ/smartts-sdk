import { ContractStorage, None, Not, Some } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TBool } from '../../src/type';

describe('Unary expressions', () => {
    it('Not', () => {
        const contract = new Contract()
            .setStorage(None())
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TBool()).code((arg) => [SetValue(ContractStorage(), Some(Not(arg)))]),
            );

        verifyContractCompilationOutput(contract);
    });
});
