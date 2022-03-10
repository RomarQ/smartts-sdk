import ExpressionAtom from '../core/enums/expression';
import { Expression, LiteralExpression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Some } from './literal';

/**
 * Open a variant
 *
 * ```typescript
 * OpenVariant(Left(Nat(1)), "Left", String("COULD NOT OPEN VARIANT"))
 * ```
 *
 * @param variant Variant expression
 * @param branch The branch name of the variant
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const OpenVariant = (variant: IExpression, branch = 'Some', errorMsg?: IExpression, line = new LineInfo()) =>
    proxy(
        new Expression(ExpressionAtom.openVariant, variant, `"${branch}"`, errorMsg ? Some(errorMsg) : 'None', line),
        Expression.proxyHandler,
    );

/**
 * Unwrap a option value
 *
 * ```typescript
 * GetSome(Some(Nat(1)), String("COULD NOT UNWRAP OPTION"))
 * ```
 *
 * @param variant Variant expression
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetSome = (variant: IExpression, errorMsg?: IExpression, line = new LineInfo()) =>
    proxy(OpenVariant(variant, 'Some', errorMsg, line), Expression.proxyHandler);

/**
 * Check if a variant literal matches a given branch.
 *
 * ```typescript
 * IsVariant(Left(Nat(1)), "Left") // true
 * IsVariant(Right(Nat(1)), "Left") // false
 * ```
 *
 * @param variant Variant expression
 * @param branch The branch name of the variant
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const IsVariant = (variant: IExpression, branch: string, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.isVariant, variant, `"${branch}"`, line), Expression.proxyHandler);

const Variant = { OpenVariant, IsVariant };

export default Variant;
