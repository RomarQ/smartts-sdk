import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';
import { Unit } from '../expression/literal';

/**
 * Return statement used inside lambdas and views.
 *
 * ```typescript
 * Lambda().setInputType(TString()).code((arg) => [Return(arg)])
 * ```
 *
 * @param expression Method returned expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @category | Result Statements
 *
 * @returns {IStatement} A statement
 */
export const Return = (expression: IExpression, line = new LineInfo()) =>
    new Statement(StatementAtom.result, expression, line);

/**
 * Interrupt the smart-contract execution. (The whole operation is rollbacked)
 *
 * ```typescript
 * FailWith(String("SOME ERROR MESSAGE"));
 * ```
 *
 * @category | Result Statements
 *
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const FailWith = (errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    new Statement(StatementAtom.failwith, errorMsg, line);
