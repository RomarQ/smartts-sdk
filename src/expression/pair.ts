import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Access the left part of a pair
 *
 * ```typescript
 * FirstElement(Pair(Nat(1), String("A String"))); // Nat(1)
 * ```
 *
 * @param expression An expression that resolves to a value of type TPair(...);
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const FirstElement = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.first, expression, line), Expression.proxyHandler);

/**
 * Access the left part of a pair
 *
 * ```typescript
 * SecondElement(Pair(Nat(1), String("A String"))); // String("A String")
 * ```
 *
 * @param expression An expression that resolves to a value of type TPair(...);
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const SecondElement = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.second, expression, line), Expression.proxyHandler);
