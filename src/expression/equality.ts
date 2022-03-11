import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import ValueAtom from '../core/enums/literal';

/**
 * Checks if two expressions resolve to equal values
 *
 * ```typescript
 * Equal(Nat(1), Nat(1)); // Bool(true)
 * ```
 *
 * @category | Equality
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Equal = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<ValueAtom.bool>(ExpressionAtom.eq, left, right, line);

/**
 * Checks if two expressions resolve to a different values
 *
 * ```typescript
 * NotEqual(Nat(1), Nat(1)); // Bool(false)
 * ```
 *
 * @category | Equality
 *
 * @param left An expression
 * @param right An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const NotEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<ValueAtom.bool>(ExpressionAtom.neq, left, right, line);

export const Equality = {
    Equal,
    NotEqual,
};
