import type { IToString, IToType } from '../typings';
import type { IType } from '../typings/type';
import type { ILiteral } from '../typings/literal';

import { capitalizeBoolean, LineInfo } from '../misc/utils';
import {
    TNat,
    TString,
    TMutez,
    TAddress,
    TBool,
    TList,
    TTimestamp,
    TChainID,
    TInt,
    TBytes,
    TOption,
    TUnknown,
} from './type';
import { Expression } from './expression';
import { Prim } from './enums/prim';

class Literal implements IToString, IToType, ILiteral {
    _isLiteral = true as const;

    constructor(public name: string, public value: IToString, public type: IType, public line: LineInfo) {}

    toString() {
        return `(literal (${this.name} ${this.value}) ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

class ListLiteral implements IToString, IToType, ILiteral {
    _isLiteral = true as const;

    constructor(
        public name: string,
        public items: (IToString & IToType)[],
        public type: IType,
        public line: LineInfo,
    ) {}

    toString() {
        return `(${this.name} ${this.line}  ${this.items.map((item) => item.toString()).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

class OptionLiteral implements IToString, IToType, ILiteral {
    _isLiteral = true as const;

    type: IType;

    constructor(
        public prim: Prim.Some | Prim.None,
        public value: (IToString & IToType) | undefined,
        public innerType: IType = TUnknown,
        public line: LineInfo,
    ) {
        this.type = TOption(innerType);
    }

    toString(): string {
        return `(variant "${this.prim}" ${this.value?.toString() || '(unit)'} ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

export const Unit = () => new Expression(Prim.unit);

export const Nat = (value: number, line = new LineInfo()) => new Literal(Prim.nat, value, TNat, line);
export const Int = (value: number, line = new LineInfo()) => new Literal(Prim.int, value, TInt, line);
export const Mutez = (value: number, line = new LineInfo()) => new Literal(Prim.mutez, value, TMutez, line);

export const String = (value: string, line = new LineInfo()) => new Literal(Prim.string, `"${value}"`, TString, line);

export const Bool = (value: boolean, line = new LineInfo()) =>
    new Literal(Prim.bool, capitalizeBoolean(value), TBool, line);

export const Address = (address: string, line = new LineInfo()) => new Literal(Prim.address, address, TAddress, line);

export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new Literal(Prim.timestamp, timestamp, TTimestamp, line);

export const ChainID = (chainID: string, line = new LineInfo()) => new Literal('chain_id_cst', chainID, TChainID, line);

export const Bytes = (bytes: string, line = new LineInfo()) => new Literal(Prim.bytes, bytes, TBytes, line);

export const List = (items: (IToString & IToType)[], innerType: IType, line = new LineInfo()) =>
    new ListLiteral(Prim.list, items, TList(innerType), line);

export const Some = (value: IToString & IToType, innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(Prim.Some, value, innerType, line);

export const None = (innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(Prim.None, undefined, innerType, line);

const Literals = {
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Address,
    Timestamp,
    ChainID,
    Bytes,
    List,
    Some,
    None,
};

export default Literals;
