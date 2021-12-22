import type { IToString } from '../typings';

import Utils, { LineInfo } from '../misc/utils';

class C_DefineLocal implements IToString {
    constructor(public name: string, public value: unknown, public mutable: boolean, public line = new LineInfo()) {}

    toString() {
        return `(defineLocal "${this.name}" ${this.value} ${Utils.capitalizeBoolean(this.mutable)} ${this.line})`;
    }
}
export const DefineVar = (name: string, value: unknown, mutable = true, line = new LineInfo()) =>
    new C_DefineLocal(name, value, mutable, line);

class C_Verify implements IToString {
    constructor(public condition: IToString, public errorMsg: IToString, public line = new LineInfo()) {}

    toString() {
        return `(verify ${this.condition} ${this.errorMsg} ${this.line})`;
    }
}
export const Require = (condition: IToString, errorMsg: IToString, line = new LineInfo()) =>
    new C_Verify(condition, errorMsg, line);

class C_SetValue implements IToString {
    name = 'set';
    constructor(public source: unknown, public value: unknown, public line = new LineInfo()) {}

    toString() {
        return `(${this.name} ${this.source} ${this.value} ${this.line})`;
    }
}
export const SetValue = (source: unknown, value: unknown, line = new LineInfo()) => new C_SetValue(source, value, line);

const Commands = {
    DefineVar,
    Require,
    SetValue,
};

export default Commands;
