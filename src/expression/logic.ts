import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

/**
 * Boolean OR. (The result is true if at least one of the expressions is true)
 *
 * ```typescript
 * Or(Bool(true), Bool(false)); // Bool(true)
 * ```
 *
 * @category | Logic
 *
 * @param left Boolean expression
 * @param right Boolean expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Or = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.or, left, right, line);

/**
 * Boolean AND. (The result is true only if both expressions are true)
 *
 * ```typescript
 * Or(Bool(true), Bool(false)); // Bool(false)
 * ```
 *
 * @category | Logic
 *
 * @param left Boolean expression
 * @param right Boolean expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const And = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.and, left, right, line);
