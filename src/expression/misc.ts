import { OpenVariant } from '.';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Unit } from './literal';

/**
 * Convert a non-negative integer to a TNat() value.
 *
 * ```typescript
 * IsNat(Math.Subtract(Nat(2), Nat(1))); // Some(Nat(1))
 * ```
 *
 * @param expression A non-negative integer expression.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that resolves to a TOption(TNat()) value.
 */
export const IsNat = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.isNat, expression, line), Expression.proxyHandler);

/**
 * Convert a non-negative integer to a TNat() value.
 *
 * ```typescript
 * CastToNat(Math.Subtract(Nat(2), Nat(1))); // Nat(1)
 * ```
 *
 * @param expression A non-negative integer expression.
 * @param errorMsg An optional value to be included in the error trace if the integer is negative.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that resolves to a TOption(TNat()) value.
 */
export const CastToNat = (expression: IExpression, errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    proxy(OpenVariant(IsNat(expression, line), 'Some', errorMsg, line), Expression.proxyHandler);
