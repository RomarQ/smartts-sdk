import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Prepend a value to a list. (Creates a new list)
 *
 * ```typescript
 * PrependToList(List([Nat(1)]), Nat(2));
 * ```
 *
 * @param list
 * @param value The value to be appended to the list
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const PrependToList = (list: IExpression, value: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.cons, value, list, line);
