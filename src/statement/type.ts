import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';

/**
 * Set expression type.
 *
 * ```typescript
 * Lambda().inputType(TString()).code((arg) => [SetType(arg, TBool())])
 * ```
 *
 * @param expression
 * @param type Expression type.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @category | Type Handling
 *
 * @returns {IStatement} A statement
 */
export const SetType = (expression: IExpression, type: IType, line = new LineInfo()) =>
    new Statement(StatementAtom.set_type, expression, type, line);
