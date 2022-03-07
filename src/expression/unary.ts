import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Boolean negation
 *
 * @param expression Boolean expression to be negated.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Not = (expression: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.not, expression, line);

export const Unary = {
    Not,
};
