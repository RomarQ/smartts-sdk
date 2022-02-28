import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

export const Add = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.add, left, right, line);

export const Multiply = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.mul, left, right, line);

export const Subtract = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.sub, left, right, line);

export const Divide = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.truediv, left, right, line);

export const Math = {
    Add,
    Multiply,
    Subtract,
    Divide,
};

export default Math;
