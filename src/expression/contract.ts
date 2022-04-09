import type { IExpression } from '../typings/expression';
import type { IType } from '../typings/type';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { TUnit } from '../type';
import { String } from './literal';
import { GetSome } from './variant';
import { MichelsonType } from '../core/enums/type';

/**
 * Cast an address to a typed contract.
 *
 * ```typescript
 * ToContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'some_entrypoint', TNat());
 * ```
 *
 * @category Contract
 *
 * @param address An expression that resolves to an address value
 * @param entrypoint Contract entrypoint
 * @param argumentType Entrypoint argument type
 * @param errorMsg The value to be included in the error trace
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TContract()`.
 */
export const ToContract = (
    address: IExpression<MichelsonType.address>,
    entrypoint = '',
    argumentType: IType = TUnit(),
    errorMsg: IExpression = String('CONTRACT_NOT_FOUND'),
    line = new LineInfo(),
): IExpression<MichelsonType.contract> => GetSome(GetContract(address, entrypoint, argumentType, line), errorMsg, line);

/**
 * Cast an address to a typed contract.
 *
 * ```typescript
 * GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'some_entrypoint', TNat());
 * ```
 *
 * @category Contract
 *
 * @param address An expression that resolves to an address value
 * @param entrypoint Contract entrypoint
 * @param argumentType Entrypoint argument type
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TContract(@argumentType))`.
 */
export const GetContract = (
    address: IExpression<MichelsonType.address>,
    entrypoint = '',
    argumentType: IType = TUnit(),
    line = new LineInfo(),
): IExpression<MichelsonType.option> =>
    new Expression(ExpressionAtom.contract, `"${entrypoint}"`, argumentType, address, line);

/**
 * Get the address of a contract value.
 *
 * ```typescript
 * ToAddress(GetSelf());
 * ```
 *
 * @category Contract
 *
 * @param contract An expression that evaluates to a contract value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TAddress()`.
 */
export const ToAddress = (
    contract: IExpression<MichelsonType.contract>,
    line = new LineInfo(),
): IExpression<MichelsonType.address> =>
    new Expression<MichelsonType.address>(ExpressionAtom.to_address, contract, line);

/**
 * Create an implicit account.
 *
 * ```typescript
 * ImplicitAccount(Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"));
 * ```
 *
 * @category Contract
 *
 * @param key_hash An expression that evaluates to a public key hash value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TContract(TUnit())`.
 */
export const ImplicitAccount = (
    key_hash: IExpression<MichelsonType.key_hash>,
    line = new LineInfo(),
): IExpression<MichelsonType.contract> => new Expression(ExpressionAtom.implicit_account, key_hash, line);
