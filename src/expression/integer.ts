import type { IExpression } from '../typings/expression';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { OpenVariant } from './variant';
import { Unit } from './literal';
import ValueAtom from '../core/enums/literal';

/**
 * Convert a value of type `TInt()` to `TOption(TNat())`.
 *
 * ```typescript
 * IsNat(Subtract(Nat(2), Nat(1))); // Some(Nat(1))
 * ```
 *
 * @param expression A non-negative integer expression.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to TOption(TNat()).
 */
export const IsNat = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.isNat, expression, line), Expression.proxyHandler);

/**
 * Convert a value of type `TInt()` to `TNat()`.
 *
 * ```typescript
 * CastToNat(Subtract(Nat(2), Nat(1))); // Nat(1)
 * ```
 *
 * @param expression A non-negative integer expression.
 * @param errorMsg An optional value to be included in the error trace if the integer is negative.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to TNat().
 */
export const CastToNat = (expression: IExpression, errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    proxy(OpenVariant(IsNat(expression, line), 'Some', errorMsg, line), Expression.proxyHandler);

/**
 * Convert a value of type `TNat()` to `TInt()`
 *
 * ```typescript
 * CastToInt(Nat(1)); // Int(1)
 * ```
 *
 * @param expression An expression that evaluates to a value of type `TNat()`.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to TInt().
 */
export const CastToInt = (expression: IExpression<ValueAtom.nat>, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.toInt, expression, line), Expression.proxyHandler);
