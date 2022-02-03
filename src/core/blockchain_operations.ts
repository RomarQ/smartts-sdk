import { Expression } from './expression';

/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-AMOUNT
 */
export const GetAmount = () => new Expression('amount');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-BALANCE
 */
export const GetBalance = () => new Expression('balance');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CHAIN_ID
 */
export const GetChain_id = () => new Expression('chain_id');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEVEL
 */
export const GetLevel = () => new Expression('level');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOW
 */
export const GetTimestamp = () => new Expression('now');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelf = () => new Expression('self');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SELF_ADDRESS
 */
export const GetSelfAddress = () => new Expression('self_address');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SENDER
 */
export const GetSender = () => new Expression('sender');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOURCE
 */
export const GetSource = () => new Expression('source');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TOTAL_VOTING_POWER
 */
export const GetTotalVotingPower = () => new Expression('total_voting_power');
/**
 * @see https://tezos.gitlab.io/michelson-reference/#instr-VOTING_POWER
 */
export const GetVotingPower = (key_hash: string) => new Expression('voting_power', key_hash);
