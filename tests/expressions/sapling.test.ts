import {
    ApplySaplingUpdate,
    ContractStorage,
    EmptySaplingState,
    GetSome,
    Sapling_state,
    SecondElement,
} from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TSapling_state, TSapling_transaction } from '../../src/type';

describe('Sapling expressions', () => {
    it('EmptySaplingState', () => {
        const contract = new Contract()
            .setStorageType(TSapling_state(8))
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(ContractStorage(), Sapling_state(8)),
                    SetValue(ContractStorage(), EmptySaplingState(8)),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
    it('ApplySaplingUpdate', () => {
        const contract = new Contract()
            .setStorageType(TSapling_state(8))
            .addEntrypoint(
                new EntryPoint('ep1')
                    .setInputType(TSapling_transaction(8))
                    .code((argument) => [
                        SetValue(
                            ContractStorage(),
                            SecondElement(GetSome(ApplySaplingUpdate(ContractStorage(), argument))),
                        ),
                    ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
