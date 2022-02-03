import { None, Some } from '../../src/core/literal';
import {
    GetChain_id,
    Contract,
    EntryPoint,
    GetTimestamp,
    GetLevel,
    GetSender,
    GetSource,
    TOption,
    TUnit,
    TAddress,
    TTimestamp,
    TChain_id,
    TNat,
} from '../../src/core';
import { ContractStorage } from '../../src/core/expression';
import { SetValue } from '../../src/core/command';
import { verifyMichelsonOutput } from '../util';
import { IType } from '../../src/typings/type';
import { IExpression } from '../../src/typings/expression';

const verify = (testName: string, type: IType, operation: IExpression) => {
    it(testName, () => {
        const contract = new Contract()
            .setStorageType(TOption(type))
            .setStorage(None())
            .addEntrypoint(
                new EntryPoint('ep1').inputType(TUnit()).code(() => [SetValue(ContractStorage(), Some(operation))]),
            )
            .toString();

        expect(contract).toMatchSnapshot();
        verifyMichelsonOutput(contract);
    });
};

describe('Test blockchain operations', () => {
    verify('Get Sender', TAddress(), GetSender());
    verify('Get Source', TAddress(), GetSource());
    verify('Get Block Level', TNat(), GetLevel());
    verify('Get Timestamp', TTimestamp(), GetTimestamp());
    verify('Get Chain ID', TChain_id(), GetChain_id());
});
