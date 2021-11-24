import type { IToString } from '../typings';

import { LineInfo } from '../misc/utils';

class C_DefineLocal implements IToString {
    constructor(public name: string, public value: unknown, public line = new LineInfo()) {}

    toString() {
        return `(defineLocal "${this.name}" ${this.value} ${this.line})`;
    }
}
export const DefineLocal = (name: string, value: unknown, line = new LineInfo()) =>
    new C_DefineLocal(name, value, line);

class C_Verify implements IToString {
    constructor(public condition: IToString, public errorMsg: IToString, public line = new LineInfo()) {}

    toString() {
        return `(verify ${this.condition} ${this.errorMsg} ${this.line})`;
    }
}
export const Verify = (condition: IToString, errorMsg: IToString, line = new LineInfo()) =>
    new C_Verify(condition, errorMsg, line);
