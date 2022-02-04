import { LineInfo } from '../misc/utils';
import { ILiteral } from '../typings/literal';
import BlockchainOperations from './enums/blockchain_operation';
import TypeAtom from './enums/type';
import { Expression } from './expression';

/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-AMOUNT
 */
export const GetAmount = () => new Expression(BlockchainOperations.amount);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-BALANCE
 */
export const GetBalance = () => new Expression(BlockchainOperations.balance);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CHAIN_ID
 */
export const GetChain_id = () => new Expression(BlockchainOperations.chain_id);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEVEL
 */
export const GetLevel = () => new Expression(BlockchainOperations.level);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOW
 */
export const GetTimestamp = () => new Expression(BlockchainOperations.now);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelf = (entry_point = '', line = new LineInfo()) =>
    new Expression(BlockchainOperations.self, `"${entry_point}"`, line);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelfAddress = () => new Expression(BlockchainOperations.self_address);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SENDER
 */
export const GetSender = () => new Expression(BlockchainOperations.sender);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOURCE
 */
export const GetSource = () => new Expression(BlockchainOperations.source);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TOTAL_VOTING_POWER
 */
export const GetTotalVotingPower = () => new Expression(BlockchainOperations.total_voting_power);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-VOTING_POWER
 */
export const GetVotingPower = (key_hash: ILiteral<TypeAtom.key_hash>, line = new LineInfo()) =>
    new Expression(BlockchainOperations.voting_power, `${key_hash}`, line);

const Operations = {
    GetAmount,
    GetBalance,
    GetChain_id,
    GetLevel,
    GetTimestamp,
    GetSelf,
    GetSelfAddress,
    GetSender,
    GetSource,
    GetTotalVotingPower,
    GetVotingPower,
};

export default Operations;
