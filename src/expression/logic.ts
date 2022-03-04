import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

export const Or = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.or, left, right, line);

export const And = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.and, left, right, line);
