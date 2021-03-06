import type { ILiteral } from '../typings/literal';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Get the amount sent in the transaction.
 *
 * ```typescript
 * GetAmount();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-AMOUNT
 *
 * @returns {IExpression} An expression
 */
export const GetAmount = () => new Expression<MichelsonType.mutez>(ExpressionAtom.amount);

/**
 * Get the contract balance.
 *
 * ```typescript
 * GetBalance();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-BALANCE
 *
 * @returns {IExpression} An expression
 */
export const GetBalance = () => new Expression<MichelsonType.mutez>(ExpressionAtom.balance);

/**
 * Get an entrypoint of the current contract.
 *
 * ```typescript
 * GetSelf();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF
 *
 * @returns {IExpression} An expression
 */
export const GetSelf = (entry_point: string, line = new LineInfo()) =>
    new Expression<MichelsonType.contract>(ExpressionAtom.self, `"${entry_point}"`, line);

/**
 * Get current contract address.
 *
 * ```typescript
 * GetSelfAddress();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 *
 * @returns {IExpression} An expression
 */
export const GetSelfAddress = () => new Expression<MichelsonType.address>(ExpressionAtom.self_address);

/**
 * Get transaction sender.
 *
 * ```typescript
 * GetSender();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SENDER
 *
 * @returns {IExpression} An expression
 */
export const GetSender = () => new Expression<MichelsonType.address>(ExpressionAtom.sender);

/**
 * Get transaction source.
 *
 * ```typescript
 * GetSource();
 * ```
 *
 * @category | Transaction metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOURCE
 *
 * @returns {IExpression} An expression
 */
export const GetSource = () => new Expression<MichelsonType.address>(ExpressionAtom.source);

/**
 * Get the chain identifier.
 *
 * ```typescript
 * GetChain_id();
 * ```
 *
 * @category | Block metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CHAIN_ID
 *
 * @returns {IExpression} An expression
 */
export const GetChain_id = () => new Expression<MichelsonType.chain_id>(ExpressionAtom.chain_id);

/**
 * Get the head block level.
 *
 * ```typescript
 * GetLevel();
 * ```
 *
 * @category | Block metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEVEL
 *
 * @returns {IExpression} An expression
 */
export const GetLevel = () => new Expression<MichelsonType.nat>(ExpressionAtom.level);

/**
 * Get the head block timestamp.
 *
 * ```typescript
 * GetTimestamp();
 * ```
 *
 * @category | Block metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOW
 *
 * @returns {IExpression} An expression
 */
export const GetTimestamp = (): IExpression => new Expression<MichelsonType.timestamp>(ExpressionAtom.now);

/**
 * Get total voting power.
 *
 * ```typescript
 * GetTotalVotingPower();
 * ```
 *
 * @category | Block metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TOTAL_VOTING_POWER
 *
 * @returns {IExpression} An expression
 */
export const GetTotalVotingPower = () => new Expression<MichelsonType.nat>(ExpressionAtom.total_voting_power);

/**
 * Get the voting power of a given implicit account.
 *
 * ```typescript
 * GetVotingPower(Key_hash('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN'));
 * ```
 *
 * @category | Block metadata
 * @see https://tezos.gitlab.io/michelson-reference/#instr-VOTING_POWER
 *
 * @param key_hash An expression that resolves to a key_hash value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetVotingPower = (key_hash: ILiteral<MichelsonType.key_hash>, line = new LineInfo()) =>
    new Expression<MichelsonType.nat>(ExpressionAtom.voting_power, `${key_hash}`, line);
