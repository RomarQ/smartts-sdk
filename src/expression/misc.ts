import { TUnit } from '..';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { Unit } from './literal';
import { OpenVariant } from './variant';

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
 * @returns {IExpression} An expression that resolves to a TNat()
 */
export const CastToNat = (expression: IExpression, errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    proxy(OpenVariant(IsNat(expression, line), 'Some', errorMsg, line), Expression.proxyHandler);

/**
 * Call lambda.
 *
 * ```typescript
 * // Calling a lambda variable with a boolean as argument
 * CallLambda(GetVariable("some_lambda"), Bool(true));
 * ```
 *
 * @param expression Lambda expression
 * @param argument Lambda argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const CallLambda = (expression: IExpression, argument: IExpression = Unit(), line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.call_lambda, expression, argument, line), Expression.proxyHandler);

/**
 * Call a onchain view.
 *
 * ```typescript
 * CallView("some_view", Address("KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT"), Nat(10), TNat());
 * ```
 *
 * @param name View name
 * @param address Contract address that contains the view being called
 * @param argument View argument
 * @param type The type of the view argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const CallView = (
    name: string,
    address: IExpression,
    argument: IExpression = Unit(),
    type: IType = TUnit(),
    line = new LineInfo(),
) => proxy(new Expression(ExpressionAtom.view, `"${name}"`, address, argument, type, line), Expression.proxyHandler);
