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
            return Expression.getAttr(target, prop);
        },
        apply: function (target, thisArg, argumentsList) {
            console.log(target, thisArg, argumentsList);
            return target;
        },
    };

    static getAttr = (from: IExpression, attr: string, line = new LineInfo()) =>
        proxy(new Expression('attr', from, `"${attr}"`, line), Expression.proxyHandler);

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}
