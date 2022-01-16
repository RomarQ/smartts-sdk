import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

type ProxyedExpression = Expression & { [prop: string]: ProxyedExpression };
/**
 * @description Wrap Expression instant in a Proxy (Meta-programming)
 * @param instance of Expression
 * @returns A proxy to the instance
 */
const proxy = (instance: Expression): ProxyedExpression =>
    new Proxy(instance, Expression.proxyHandler) as ProxyedExpression;

export class Expression implements IExpression {
    args: IExpression[];

    constructor(public name: string, ...args: (IExpression | LineInfo)[]) {
        this.args = args || [];
    }

    static proxyHandler: ProxyHandler<Expression> = {
        get: function (target, prop: string, receiver) {
            if (prop in target || typeof prop === 'symbol') {
                return Reflect.get(target, prop, receiver);
            }
            return GetProperty(prop, target);
        },
        apply: function (target, thisArg, argumentsList) {
            console.log(target, thisArg, argumentsList);
            return target;
        },
    };

    [Symbol.toPrimitive]() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}

export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

export const ContractStorage = () => proxy(new Expression('data'));

export const GetProperty = (attr: string, from: IExpression, line = new LineInfo()) =>
    proxy(new Expression('attr', from, `"${attr}"`, line));

// Binary Expressions

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

const Expressions = {
    GetLocal,
    ContractStorage,
    GetProperty,
    // Binary Expressions
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

export default Expressions;
