import { Key_hash, None, Some } from '../../src/core/literal';
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
    GetAmount,
    TMutez,
    GetBalance,
    TInt,
    GetSelf,
    GetSelfAddress,
    GetTotalVotingPower,
    GetVotingPower,
    TContract,
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
    verify('SENDER', TAddress(), GetSender());
    verify('SOURCE', TAddress(), GetSource());
    verify('LEVEL', TNat(), GetLevel());
    verify('NOW', TTimestamp(), GetTimestamp());
    verify('CHAIN_ID', TChain_id(), GetChain_id());
    verify('AMOUNT', TMutez(), GetAmount());
    verify('BALANCE', TMutez(), GetBalance());
    verify('SELF', TContract(TUnit()), GetSelf());
    verify('SELF_ADDRESS', TAddress(), GetSelfAddress());
    verify('TOTAL_VOTING_POWER', TNat(), GetTotalVotingPower());
    verify('VOTING_POWER', TNat(), GetVotingPower(Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')));
});
