import { IProxiableExpression } from '../expression';
import Utils, { LineInfo } from '../../misc/utils';
import { IStatement } from '../../typings/statement';

class C_DefineLocal implements IStatement {
    constructor(public name: string, public value: unknown, public mutable: boolean, public line = new LineInfo()) {}

    toString() {
        return `(defineLocal "${this.name}" ${this.value} ${Utils.capitalizeBoolean(this.mutable)} ${this.line})`;
    }
}
export const DefineVar = (name: string, value: unknown, mutable = true, line = new LineInfo()) =>
    new C_DefineLocal(name, value, mutable, line);

class C_SetValue implements IStatement {
    name = 'set';
    constructor(public source: unknown, public value: unknown, public line = new LineInfo()) {}

    toString() {
        return `(${this.name} ${this.source} ${this.value} ${this.line})`;
    }
}
export const SetValue = (source: IProxiableExpression, value: IProxiableExpression, line = new LineInfo()) =>
    new C_SetValue(source, value, line);

const Variable = {
    DefineVar,
    SetValue,
};

export default Variable;
