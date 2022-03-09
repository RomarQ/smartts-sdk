import type { IExpression } from '../typings/expression';
import { LineInfo } from '../misc/utils';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

/**
 * Add two numerical values
 *
 * ```typescript
 * Add(Nat(1), Nat(1)); // Nat(2)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Add = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.add, left, right, line);

/**
 * Multiply two numerical values
 *
 * ```typescript
 * Multiply(Nat(1), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Multiply = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.mul_overloaded, left, right, line);

/**
 * Subtract two numerical values
 *
 * ```typescript
 * Subtract(Nat(1), Nat(1)); // Nat(0)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Subtract = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.sub, left, right, line);

/**
 * Division operation.
 *
 * ```typescript
 * Divide(Nat(1), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Divide = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.truediv, left, right, line);

export const Math = {
    Add,
    Multiply,
    Subtract,
    Divide,
};

export default Math;
