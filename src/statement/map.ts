import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Delete map entry.
 *
 * ```typescript
 * DeleteMapEntry(GetVariable("some_map"), arg);
 * ```
 *
 * @param expression A map expression.
 * @param key The indexing key to be deleted.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const DeleteMapEntry = (expression: IExpression, key: IExpression, line = new LineInfo()) =>
    new Statement(StatementAtom.delItem, expression, key, line);
