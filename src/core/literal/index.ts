import type { IType } from '../../typings/type';
import type { ILiteral } from '../../typings/literal';

import { capitalizeBoolean, LineInfo } from '../../misc/utils';
import {
    TNat,
    TString,
    TMutez,
    TAddress,
    TBool,
    TList,
    TTimestamp,
    TChain_id,
    TInt,
    TBytes,
    TOption,
    TUnknown,
    TUnit,
    TRecord,
    TMap,
    TBig_map,
    TKey_hash,
} from '../type';
import { Prim } from '../enums/prim';
import { IExpression, IExpressionKind } from '../../typings/expression';
import { Layout } from '../enums/layout';

class Literal<T extends string> implements ILiteral<T> {
    _isExpression = true as const;

    constructor(
        public name: T,
        public value: number | string | boolean | undefined,
        public type: IType,
        public line: LineInfo,
    ) {}

    toString() {
        if (typeof this.value === 'undefined') {
            return `(${this.name})`;
        }
        return `(literal (${this.name} ${this.value}) ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

class ListLiteral<T> implements ILiteral<T> {
    _isExpression = true as const;

    constructor(public name: T, public items: IExpressionKind[], public type: IType, public line: LineInfo) {}

    toString() {
        return `(${this.name} ${this.line}  ${this.items.map((item) => item.toString()).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

class OptionLiteral implements ILiteral<'option'> {
    _isExpression = true as const;
    name = 'option' as const;

    type: IType;

    constructor(
        public prim: Prim.Some | Prim.None,
        public value: IExpressionKind | undefined,
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

class RecordLiteral implements ILiteral<'record'> {
    _isExpression = true as const;
    name = 'record' as const;

    type: IType;

    constructor(public fields: Record<string, ILiteral<unknown>>, public line: LineInfo) {
        // Compute the record type (use rightcombs by default)
        this.type = TRecord(
            Object.entries(fields).reduce(
                (pv, [field, expr]) => ({
                    ...pv,
                    [field]: expr.type.toString(),
                }),
                {},
            ),
            Layout.right_comb,
        );
    }

    private buildFields = (fields: Record<string, IExpressionKind>) => {
        return Object.entries(fields).map(([field, expr]) => `(${field} ${expr.toString()})`);
    };

    toString(): string {
        return `(record ${this.line} ${this.buildFields(this.fields).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

class MapLiteral<T extends Prim.map | Prim.big_map> implements ILiteral<T> {
    _isExpression = true as const;
    name: T;

    type: IType;

    constructor(public prim: T, public rows: IExpression[][], keyType: IType, valueType: IType, public line: LineInfo) {
        this.name = prim;
        if (prim === Prim.map) {
            this.type = TMap(keyType, valueType);
        } else {
            this.type = TBig_map(keyType, valueType);
        }
    }

    private buildEntry = ([key, value]: IExpression[]) => {
        return `(${key.toString()} ${value.toString()})`;
    };

    toString() {
        return `(${this.prim} ${this.line} ${this.rows.map(this.buildEntry).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

export const Unit = (line = new LineInfo()) => new Literal(Prim.unit, undefined, TUnit(), line);

export const Nat = (value: number, line = new LineInfo()) => new Literal(Prim.nat, value, TNat(), line);
export const Int = (value: number, line = new LineInfo()) => new Literal(Prim.int, value, TInt(), line);
export const Mutez = (value: number, line = new LineInfo()) => new Literal(Prim.mutez, value, TMutez(), line);

export const String = (value: string, line = new LineInfo()) => new Literal(Prim.string, `"${value}"`, TString(), line);

export const Bool = (value: boolean, line = new LineInfo()) =>
    new Literal(Prim.bool, capitalizeBoolean(value), TBool(), line);

export const Address = (address: string, line = new LineInfo()) => new Literal(Prim.address, address, TAddress(), line);

export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new Literal(Prim.timestamp, timestamp, TTimestamp(), line);

export const ChainID = (chainID: string, line = new LineInfo()) =>
    new Literal('chain_id_cst', chainID, TChain_id(), line);

export const Bytes = (bytes: string, line = new LineInfo()) => new Literal(Prim.bytes, bytes, TBytes(), line);

export const Key_hash = (key_hash: string, line = new LineInfo()) =>
    new Literal<'key_hash'>(Prim.key_hash, key_hash, TKey_hash(), line);

// Containers
export const List = (items: IExpressionKind[], innerType: IType, line = new LineInfo()) =>
    new ListLiteral(Prim.list, items, TList(innerType), line);
export const Some = (value: IExpressionKind, innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(Prim.Some, value, innerType, line);
export const None = (innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(Prim.None, undefined, innerType, line);

export const Record = (fields: Record<string, ILiteral<unknown>>, line = new LineInfo()) =>
    new RecordLiteral(fields, line);

export const Map = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown,
    valueType: IType = TUnknown,
    line = new LineInfo(),
) => new MapLiteral(Prim.map, rows, keyType, valueType, line);

export const BigMap = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown,
    valueType: IType = TUnknown,
    line = new LineInfo(),
) => new MapLiteral(Prim.big_map, rows, keyType, valueType, line);

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
    Record,
    Map,
    BigMap,
};

export default Literals;
