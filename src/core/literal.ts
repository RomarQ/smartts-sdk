import type { IToString, IToType } from '../typings';

import { LineInfo } from '../misc/utils';
import { TNat, TString, TMutez, BaseType } from './type';
import { TList } from '.';

export class Literal implements IToString, IToType {
    constructor(public name: string, public value: IToString, public type: IToString, public line: LineInfo) {}

    toString() {
        return `(literal (${this.name} ${this.value}) ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

export class _List implements IToString, IToType {
    constructor(
        public name: string,
        public items: (IToString & IToType)[],
        public type: IToString,
        public line: LineInfo,
    ) {}

    toString() {
        return `(${this.name} ${this.line}  ${this.items.map((item) => item.toString()).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

export const Nat = (value: number, line = new LineInfo()) => new Literal('nat', value, TNat, line);

export const Mutez = (value: number, line = new LineInfo()) => new Literal('mutez', value, TMutez, line);

export const String = (value: string, line = new LineInfo()) => new Literal('string', `"${value}"`, TString, line);

export const List = (items: (IToString & IToType)[], innerType: BaseType, line = new LineInfo()) =>
    new _List('list', items, TList(innerType), line);
