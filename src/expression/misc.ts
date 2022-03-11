import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { TUnknown } from '../type';
import { List, Unit } from './literal';
import ValueAtom from '../core/enums/literal';

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
    outputType: IType = TUnknown(),
    line = new LineInfo(),
) =>
    proxy(
        new Expression(ExpressionAtom.view, `"${name}"`, address, argument, outputType, line),
        Expression.proxyHandler,
    );

/**
 * String / Bytes Concatenation
 *
 * ```typescript
 * Concat([ String("Hello"), String(" "), String("World") ]);
 * ```
 *
 * @param values
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const Concat = <T extends ValueAtom.bytes | ValueAtom.string>(values: IExpression<T>[], line = new LineInfo()) =>
    proxy(new Expression<T>(ExpressionAtom.concat, List(values), line), Expression.proxyHandler);
