import { ContractStorage, Unpack, Pack } from '../../src/expression';
import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { TOption, TString } from '../../src/type';

describe('Serialization Expressions', () => {
    it('Packing & Unpacking', () => {
        const contract = new Contract()
            .setStorageType(TOption(TString()))
            .addEntrypoint(
                new EntryPoint('entry_point_1').code((argument) => [
                    SetValue(ContractStorage(), Unpack(Pack(argument), TString())),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
