import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';

/**
 * Return statement used inside lambdas and views.
 *
 * ```typescript
 * Lambda().inputType(TString()).code((arg) => [Return(arg)])
 * ```
 *
 * @param expression Method returned expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const Return = (expression: IExpression, line = new LineInfo()) =>
    new Statement(StatementAtom.result, expression, line);

const Method = {
    Return,
};

export default Method;
