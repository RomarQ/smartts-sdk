import type { IToString, IToType } from '../typings';
import type { IType } from '../typings/type';
import type { ILiteral } from '../typings/literal';

import { capitalizeBoolean, LineInfo } from '../misc/utils';
import { TNat, TString, TMutez, TAddress, TBool, TList } from './type';
import { Expression } from './expression';

class Literal implements IToString, IToType, ILiteral {
    _isLiteral = true as const;

    constructor(public name: string, public value: IToString, public type: IToString, public line: LineInfo) {}

    toString() {
        return `(literal (${this.name} ${this.value}) ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

class ListLeteral implements IToString, IToType {
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

export const Unit = () => new Expression('unit');

export const Nat = (value: number, line = new LineInfo()) => new Literal('nat', value, TNat, line);

export const Mutez = (value: number, line = new LineInfo()) => new Literal('mutez', value, TMutez, line);

export const String = (value: string, line = new LineInfo()) => new Literal('string', `"${value}"`, TString, line);

export const Bool = (value: boolean, line = new LineInfo()) =>
    new Literal('bool', capitalizeBoolean(value), TBool, line);

export const Address = (address: string, line = new LineInfo()) => new Literal('address', address, TAddress, line);

export const List = (items: (IToString & IToType)[], innerType: IType, line = new LineInfo()) =>
    new ListLeteral('list', items, TList(innerType), line);

const Literals = {
    Unit,
    Nat,
    Mutez,
    String,
    Bool,
    Address,
    List,
};

export default Literals;
