import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { None, Some } from './literal';

/**
 * Open a variant
 *
 * ```typescript
 * OpenVariant(Left(Nat(1)), "Left")
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

export const IsVariant = (variant: IExpression, branch: string, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.isVariant, variant, `"${branch}"`, line), Expression.proxyHandler);

const Variant = { OpenVariant };

export default Variant;
