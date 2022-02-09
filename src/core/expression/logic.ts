import { LineInfo } from '../../misc/utils';
import { IProxiableExpression, Expression } from './expression';

export const Equal = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('eq', left, right, line);

export const NotEqual = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('neq', left, right, line);

export const LessThan = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('lt', left, right, line);

export const GreaterThan = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('gt', left, right, line);

export const LessThanOrEqual = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('le', left, right, line);

export const GreaterThanOrEqual = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('ge', left, right, line);

export const Add = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('add', left, right, line);

export const Mul = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('mul', left, right, line);

export const Sub = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
    new Expression('sub', left, right, line);

export const Div = (left: IProxiableExpression, right: IProxiableExpression, line = new LineInfo()) =>
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
