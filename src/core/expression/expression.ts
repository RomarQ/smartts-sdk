import { proxy } from '../../misc/proxy';
import { LineInfo } from '../../misc/utils';
import { IExpression } from '../../typings/expression';
import { ILiteral } from '../../typings/literal';
import { IType } from '../../typings/type';

export class Expression implements IExpression {
    _isExpression = true as const;
    args;

    constructor(public name: string, ...args: (IExpression | LineInfo | IType | string | ILiteral<unknown>)[]) {
        this.args = args || [];
    }

    static proxyHandler: ProxyHandler<IExpression> = {
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

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}

export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

export const ContractStorage = () => proxy(new Expression('data'), Expression.proxyHandler);

export const GetProperty = (attr: string, from: IExpression, line = new LineInfo()) =>
    proxy(new Expression('attr', from, `"${attr}"`, line), Expression.proxyHandler);

// Typing

export const SetType = (expr: IExpression, type: IType, line = new LineInfo()) =>
    new Expression('set_type', expr, type, line);

const Expressions = {
    GetLocal,
    ContractStorage,
    GetProperty,
};

export default Expressions;
