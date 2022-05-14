import { Contract, EntryPoint } from '../../src/core';
import { verifyContractCompilationOutput } from '../util';
import { SetValue } from '../../src/statement';
import { CallMichelson, ContractStorage, InlinedMichelson, String } from '../../src/expression';
import { TBool, TString } from '../../src/type';

describe('Inlined Michelson', () => {
    it('Call inlined michelson', () => {
        const inlinedMichelson = InlinedMichelson(
            `
            DUP;
            SIZE;
            DIG 2;
            SWAP;
            PUSH nat 0;
            SLICE;
            IF_NONE
                {
                    DROP;
                    PUSH bool False;
                }
                {
                    COMPARE;
                    EQ;
                };
            `,
            [TString(), TString()],
            [TBool()],
        );
        const contract = new Contract()
            .setStorageType(TBool())
            .addEntrypoint(
                new EntryPoint('ep1').code(() => [
                    SetValue(
                        ContractStorage(),
                        CallMichelson(inlinedMichelson, undefined, String('Hello World'), String('Hello')),
                    ),
                ]),
            );

        verifyContractCompilationOutput(contract);
    });
});
