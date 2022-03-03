import type { ILiteral } from '../typings/literal';
import ExpressionAtom from '../core/enums/expression';
import TypeAtom from '../core/enums/type';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';

/**
 * Get the amount sent in the transaction.
 *
 * ```typescript
 * GetAmount();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-AMOUNT
 *
 * @returns {IExpression} An expression
 */
export const GetAmount = () => new Expression(ExpressionAtom.amount);
/**
 * Get the contract balance.
 *
 * ```typescript
 * GetBalance();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-BALANCE
 *
 * @returns {IExpression} An expression
 */
export const GetBalance = () => new Expression(ExpressionAtom.balance);
/**
 * Get the chain identifier.
 *
 * ```typescript
 * GetChain_id();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CHAIN_ID
 *
 * @returns {IExpression} An expression
 */
export const GetChain_id = () => new Expression(ExpressionAtom.chain_id);
/**
 * Get the head block level.
 *
 * ```typescript
 * GetLevel();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEVEL
 *
 * @returns {IExpression} An expression
 */
export const GetLevel = () => new Expression(ExpressionAtom.level);
/**
 * Get the head block timestamp.
 *
 * ```typescript
 * GetTimestamp();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOW
 *
 * @returns {IExpression} An expression
 */
export const GetTimestamp = () => new Expression(ExpressionAtom.now);
/**
 * Get an entrypoint of the current contract.
 *
 * ```typescript
 * GetSelf();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF
 *
 * @returns {IExpression} An expression
 */
export const GetSelf = (entry_point = '', line = new LineInfo()) =>
    new Expression(ExpressionAtom.self, `"${entry_point}"`, line);
/**
 * Get current contract address.
 *
 * ```typescript
 * GetSelfAddress();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 *
 * @returns {IExpression} An expression
 */
export const GetSelfAddress = () => new Expression(ExpressionAtom.self_address);
/**
 * Get transaction sender.
 *
 * ```typescript
 * GetSender();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SENDER
 *
 * @returns {IExpression} An expression
 */
export const GetSender = () => new Expression(ExpressionAtom.sender);
/**
 * Get transaction source.
 *
 * ```typescript
 * GetSource();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOURCE
 *
 * @returns {IExpression} An expression
 */
export const GetSource = () => new Expression(ExpressionAtom.source);
/**
 * Get total voting power.
 *
 * ```typescript
 * GetTotalVotingPower();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TOTAL_VOTING_POWER
 *
 * @returns {IExpression} An expression
 */
export const GetTotalVotingPower = () => new Expression(ExpressionAtom.total_voting_power);
/**
 * Get the voting power of a given implicit account.
 *
 * ```typescript
 * GetVotingPower(Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'));
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-VOTING_POWER
 *
 * @returns {IExpression} An expression
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
