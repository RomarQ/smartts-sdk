import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Check if a value is less than another value.
 *
 * ```typescript
 * LessThan(Nat(1), Nat(1)); // Bool(false)
 * ```
 *
 * @category Comparison
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const LessThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<MichelsonType.bool>(ExpressionAtom.lt, left, right, line);

/**
 * Check if a value is greater than another value.
 *
 * ```typescript
 * GreaterThan(Nat(1), Nat(1)); // Bool(false)
 * ```
 *
 * @category Comparison
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GreaterThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<MichelsonType.bool>(ExpressionAtom.gt, left, right, line);

/**
 * Check if a value is less than or equal another value.
 *
 * ```typescript
 * LessThanOrEqual(Nat(1), Nat(1)); // Bool(true)
 * ```
 *
 * @category Comparison
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const LessThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<MichelsonType.bool>(ExpressionAtom.le, left, right, line);

/**
 * Check if a value is greater than or equal another value.
 *
 * ```typescript
 * GreaterThanOrEqual(Nat(1), Nat(1)); // Bool(true)
 * ```
 *
 * @category Comparison
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GreaterThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<MichelsonType.bool>(ExpressionAtom.ge, left, right, line);

export const Comparison = {
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
};
