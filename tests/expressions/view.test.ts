import { CallView, ContractStorage, GetSelfAddress, Not } from '../../src/expression';
import { Contract, EntryPoint, OnChainView } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { Return, SetValue } from '../../src/statement';
import { TBool, TOption } from '../../src/type';

describe('View expressions', () => {
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
});
