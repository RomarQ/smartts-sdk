import {
    GetChain_id,
    GetTimestamp,
    GetLevel,
    GetSender,
    GetSource,
    GetAmount,
    GetBalance,
    GetSelf,
    GetSelfAddress,
    GetTotalVotingPower,
    GetVotingPower,
    ContractStorage,
    Key_hash,
    None,
    Some,
} from '../../src/expression';
import { TOption, TUnit, TAddress, TTimestamp, TChain_id, TNat, TMutez, TContract } from '../../src/type';
import { SetValue } from '../../src/statement';
import { verifyContractCompilationOutput } from '../util';
import { IType } from '../../src/typings/type';
import { IExpression } from '../../src/typings/expression';
import { Contract, EntryPoint } from '../../src/core';

const verify = (testName: string, type: IType, operation: IExpression) => {
    it(testName, () => {
        const contract = new Contract()
            .setStorageType(TOption(type))
            .setStorage(None())
            .addEntrypoint(
                new EntryPoint('ep1').setInputType(TUnit()).code(() => [SetValue(ContractStorage(), Some(operation))]),
            );

        verifyContractCompilationOutput(contract);
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
