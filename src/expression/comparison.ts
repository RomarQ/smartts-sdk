import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

export const Equal = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.eq, left, right, line);

export const NotEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.neq, left, right, line);

export const LessThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.lt, left, right, line);

export const GreaterThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.gt, left, right, line);

export const LessThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.le, left, right, line);

export const GreaterThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.ge, left, right, line);

export const Comparison = {
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
};

export default Comparison;
