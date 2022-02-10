import { LineInfo } from '../../misc/utils';
import { ILiteral } from '../../typings/literal';
import ExpressionAtom from '../enums/expression';
import TypeAtom from '../enums/type';
import { Expression } from './expression';

/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-AMOUNT
 */
export const GetAmount = () => new Expression(ExpressionAtom.amount);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-BALANCE
 */
export const GetBalance = () => new Expression(ExpressionAtom.balance);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CHAIN_ID
 */
export const GetChain_id = () => new Expression(ExpressionAtom.chain_id);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEVEL
 */
export const GetLevel = () => new Expression(ExpressionAtom.level);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOW
 */
export const GetTimestamp = () => new Expression(ExpressionAtom.now);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelf = (entry_point = '', line = new LineInfo()) =>
    new Expression(ExpressionAtom.self, `"${entry_point}"`, line);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelfAddress = () => new Expression(ExpressionAtom.self_address);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SENDER
 */
export const GetSender = () => new Expression(ExpressionAtom.sender);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOURCE
 */
export const GetSource = () => new Expression(ExpressionAtom.source);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TOTAL_VOTING_POWER
 */
export const GetTotalVotingPower = () => new Expression(ExpressionAtom.total_voting_power);
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-VOTING_POWER
 */
export const GetVotingPower = (key_hash: ILiteral<TypeAtom.key_hash>, line = new LineInfo()) =>
    new Expression(ExpressionAtom.voting_power, `${key_hash}`, line);

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
