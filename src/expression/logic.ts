import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';

export const Equal = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('eq', left, right, line);

export const NotEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('neq', left, right, line);

export const LessThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('lt', left, right, line);

export const GreaterThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('gt', left, right, line);

export const LessThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('le', left, right, line);

export const GreaterThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('ge', left, right, line);

export const Add = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('add', left, right, line);

export const Mul = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('mul', left, right, line);

export const Sub = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('sub', left, right, line);

export const Div = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('truediv', left, right, line);

const Logic = {
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
    Add,
    Mul,
    Sub,
    Div,
};

export default Logic;
