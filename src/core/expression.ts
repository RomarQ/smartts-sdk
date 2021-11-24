import type { IToString } from '../typings';

import { LineInfo } from '../misc/utils';

export class Expression implements IToString {
    args: IToString[];

    constructor(public name: string, ...args: IToString[]) {
        this.args = args || [];
    }

    toString() {
        return `(${this.name} ${this.args.map((arg) => arg.toString()).join(' ')})`;
    }
}

export const EntryPointParam = (line = new LineInfo()) => new Expression('params', line);

export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

export const Equal = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('eq', left, right, line);
