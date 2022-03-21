import type { IExpression } from '../typings/expression';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { Unit } from './literal';
import { GetSome } from '.';
import { MichelsonType } from '../core/enums/type';

/**
 * Convert a value of type `TInt()` to `TOption(TNat())`.
 *
 * ```typescript
 * IsNat(Subtract(Nat(2), Nat(1))); // Some(Nat(1))
 * ```
 *
 * @category Integer
 *
 * @param expression A non-negative integer expression.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to TOption(TNat()).
 */
export const IsNat = (expression: IExpression, line = new LineInfo()) =>
    new Expression<MichelsonType.option>(ExpressionAtom.isNat, expression, line);

/**
 * Convert a value of type `TInt()` to `TNat()`.
 *
 * ```typescript
 * CastToNat(Subtract(Nat(2), Nat(1))); // Nat(1)
 * ```
 *
 * @category Integer
 *
 * @param expression A non-negative integer expression.
 * @param errorMsg An optional value to be included in the error trace if the integer is negative.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to TNat().
 */
export const CastToNat = (
    expression: IExpression,
    errorMsg: IExpression = Unit(),
    line = new LineInfo(),
): IExpression<MichelsonType.nat> => GetSome(IsNat(expression, line), errorMsg, line);

/**
 * Convert a value of type `TNat()` to `TInt()`
 *
 * ```typescript
 * CastToInt(Nat(1)); // Int(1)
 * ```
 *
 * @category Integer
 *
 * @param expression An expression that evaluates to a value of type `TInt()`.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to `TNat()`.
 */
export const CastToInt = (expression: IExpression<MichelsonType.nat>, line = new LineInfo()) =>
    new Expression<MichelsonType.int>(ExpressionAtom.toInt, expression, line);

/**
 * Obtain the absolute value of an `TInt()` value.
 *
 * ```typescript
 * ABS(Int(-1)); // Nat(1)
 * ```
 *
 * @category Integer
 *
 * @param expression An expression that evaluates to a value of type `TInt()`.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to `TNat()`.
 */
export const ABS = (expression: IExpression<MichelsonType.int>, line = new LineInfo()) =>
    new Expression<MichelsonType.nat>(ExpressionAtom.abs, expression, line);
