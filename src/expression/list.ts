import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * @description Prepend an value to a list.
 *
 * @param list
 * @param value The value to be appended to the list
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const AppendToList = (list: IExpression, value: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.cons, value, list, line);

const List = { AppendToList };

export default List;
