import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Unit } from './literal';

/**
 * Call lambda.
 *
 * ```typescript
 * // Calling a lambda variable with a boolean as argument
 * CallLambda(GetVariable("some_lambda"), Bool(true));
 * ```
 *
 * @category | Lambda
 *
 * @param expression Lambda expression
 * @param argument Lambda argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const CallLambda = (
    expression: IExpression<MichelsonType.lambda>,
    argument: IExpression = Unit(),
    line = new LineInfo(),
) => proxy(new Expression(ExpressionAtom.call_lambda, expression, argument, line), Expression.proxyHandler);
