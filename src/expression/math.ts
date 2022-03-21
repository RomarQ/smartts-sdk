import type { IExpression } from '../typings/expression';
import { LineInfo } from '../misc/utils';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';

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

/**
 * Euclidean Division
 *
 * ```typescript
 * EuclideanDivision(Nat(13), Nat(3)); // Some(Pair(Nat(4), Nat(1)))
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TPair(@quotient_type, @remainder_type)))
 */
export const EuclideanDivision = (
    left: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    right: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    line = new LineInfo(),
): IExpression<MichelsonType.option> => new Expression(ExpressionAtom.ediv, left, right, line);

/**
 * Modulus
 *
 * ```typescript
 * Mod(Nat(13), Nat(3)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const Mod = (
    left: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    right: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    line = new LineInfo(),
) => new Expression(ExpressionAtom.mod, left, right, line);

/**
 * Logical left shift
 *
 * ```typescript
 * ShiftLeft(Nat(2), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const ShiftLeft = (
    left: IExpression<MichelsonType.nat>,
    right: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => new Expression<MichelsonType.nat>(ExpressionAtom.lsl, left, right, line);

/**
 * Logical right shift
 *
 * ```typescript
 * ShiftRight(Nat(2), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const ShiftRight = (
    left: IExpression<MichelsonType.nat>,
    right: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => new Expression<MichelsonType.nat>(ExpressionAtom.lsr, left, right, line);

export const Math = {
    Add,
    Multiply,
    Subtract,
    Divide,
    EuclideanDivision,
    Mod,
    ShiftLeft,
    ShiftRight,
};

export default Math;
