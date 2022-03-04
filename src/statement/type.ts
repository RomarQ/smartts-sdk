import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';

/**
 * Set expression type.
 *
 * @param expression
 * @param type Expression type.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const SetType = (expression: IExpression, type: IType, line = new LineInfo()) =>
    new Statement(StatementAtom.set_type, expression, type, line);
