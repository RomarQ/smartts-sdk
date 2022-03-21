import type { IExpression } from '../typings/expression';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { Some } from './literal';
import { MichelsonType } from '../core/enums/type';

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
export const OpenVariant = (
    variant: IExpression<MichelsonType.option | MichelsonType.or>,
    branch = 'Some',
    errorMsg?: IExpression,
    line = new LineInfo(),
): IExpression<any> =>
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
export const GetSome = (
    variant: IExpression<MichelsonType.option>,
    errorMsg?: IExpression,
    line = new LineInfo(),
): IExpression<any> => proxy(OpenVariant(variant, 'Some', errorMsg, line), Expression.proxyHandler);

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
export const IsVariant = (
    variant: IExpression<MichelsonType.option | MichelsonType.or>,
    branch: string,
    line = new LineInfo(),
): IExpression<MichelsonType.bool> => new Expression(ExpressionAtom.isVariant, variant, `"${branch}"`, line);

const Variant = { OpenVariant, IsVariant, GetSome };

export default Variant;
