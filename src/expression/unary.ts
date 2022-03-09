import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Boolean negation and bitwise complement.
 *
 * ```ts
 * Not(Bool(true)); // Bool(false)
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NOT
 *
 * @param expression An expression that evaluates to either `TBool()`, `TInt()` or `TNat()`.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @category | Unary
 *
 * @returns {IExpression} An expression
 */
export const Not = (expression: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.not, expression, line);

/**
 * Negate a numerical value.
 *
 * ```ts
 * Negate(Int(1)); // Int(-1)
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NEG
 *
 * @param expression An expression that evaluates to either `TInt()`, `TNat()`, `TBls12_381_g2()`, `TBls12_381_g1()` or `TBls12_381_fr()`.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @category | Unary
 *
 * @returns {IExpression} An expression
 */
export const Negate = (expression: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.neg, expression, line);

export const Unary = {
    Not,
    Negate,
};
