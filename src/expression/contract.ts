import type { IExpression } from '../typings/expression';
import type { IType } from '../typings/type';
import ExpressionAtom from '../core/enums/expression';
import ValueAtom from '../core/enums/literal';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { TUnit } from '../type';
import { String } from './literal';
import { GetSome } from './variant';

/**
 * Build a contract entrypoint accessor.
 *
 * ```typescript
 * GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'some_entrypoint', TNat());
 * ```
 *
 * @category | Contract
 *
 * @param address An expression that resolves to an address value
 * @param entrypoint Contract entrypoint
 * @param argumentType Entrypoint argument type
 * @param errorMsg The value to be included in the error trace
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TContract()`.
 */
export const GetContract = (
    address: IExpression<ValueAtom.address>,
    entrypoint = 'default',
    argumentType: IType = TUnit(),
    errorMsg: IExpression = String('CONTRACT_NOT_FOUND'),
    line = new LineInfo(),
): IExpression<ValueAtom.contract> => GetSome(ToContract(address, entrypoint, argumentType, line), errorMsg, line);

/**
 * Cast an address to a typed contract
 *
 * ```typescript
 * ToContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'some_entrypoint', TNat());
 * ```
 *
 * @category | Contract
 *
 * @param address An expression that resolves to an address value
 * @param entrypoint Contract entrypoint
 * @param argumentType Entrypoint argument type
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TContract(@argumentType))`.
 */
export const ToContract = (
    address: IExpression<ValueAtom.address>,
    entrypoint = 'default',
    argumentType: IType = TUnit(),
    line = new LineInfo(),
): IExpression<ValueAtom.option> => new Expression(ExpressionAtom.contract, entrypoint, argumentType, address, line);

/**
 * Get the address of a contract value.
 *
 * ```typescript
 * ToAddress(GetSelf());
 * ```
 *
 * @category | Contract
 *
 * @param contract An expression that evaluates to a contract value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TAddress()`.
 */
export const ToAddress = (
    contract: IExpression<ValueAtom.contract>,
    line = new LineInfo(),
): IExpression<ValueAtom.address> => new Expression<ValueAtom.address>(ExpressionAtom.to_address, contract, line);
