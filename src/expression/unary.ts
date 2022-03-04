import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

export const Not = (expression: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.not, expression, line);

export const Unary = {
    Not,
};
