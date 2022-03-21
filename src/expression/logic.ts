import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Boolean OR. (The result is true if at least one of the expressions is true)
 *
 * ```typescript
 * Or(Bool(true), Bool(false)); // Bool(true)
 * ```
 *
 * @category Logic
 *
 * @param left Boolean expression
 * @param right Boolean expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Or = <T extends MichelsonType.nat | MichelsonType.bool>(
    left: IExpression<T>,
    right: IExpression<T>,
    line = new LineInfo(),
) => new Expression<T>(ExpressionAtom.or, left, right, line);

/**
 * Boolean AND. (The result is true only if both expressions are true)
 *
 * ```typescript
 * And(Bool(true), Bool(false)); // Bool(false)
 * ```
 *
 * @category Logic
 *
 * @param left Boolean expression
 * @param right Boolean expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const And = <T extends MichelsonType.nat | MichelsonType.int | MichelsonType.bool>(
    left: IExpression<T>,
    right: IExpression<T>,
    line = new LineInfo(),
) => new Expression<MichelsonType.nat | MichelsonType.bool>(ExpressionAtom.and, left, right, line);

/**
 * Boolean XOR.
 *
 * ```typescript
 * Xor(Bool(true), Bool(false)); // Bool(true)
 * ```
 *
 * @category Logic
 *
 * @param left Boolean expression
 * @param right Boolean expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Xor = <T extends MichelsonType.nat | MichelsonType.bool>(
    left: IExpression<T>,
    right: IExpression<T>,
    line = new LineInfo(),
) => new Expression<T>(ExpressionAtom.xor, left, right, line);
