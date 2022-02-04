import type { IType } from '../../typings/type';
import type { ILiteral } from '../../typings/literal';

import { capitalizeBoolean, LineInfo, parenthesis } from '../../misc/utils';
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
    TKey,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TSignature,
    TSet,
} from '../type';
import { IExpression, IExpressionKind } from '../../typings/expression';
import { Layout } from '../enums/layout';
import LiteralAtom from '../enums/literal';
import TypeAtom from '../enums/type';

class Literal<T extends TypeAtom> implements ILiteral<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = null as unknown as T;

    constructor(
        private name: LiteralAtom,
        private value: number | string | boolean | undefined,
        public type: IType,
        private line: LineInfo,
    ) {}

    toString() {
        if (typeof this.value === 'undefined') {
            return parenthesis(this.name);
        }
        return `(literal (${this.name} ${this.value}) ${this.line})`;
    }

    toType() {
        return this.type.toString();
    }
}

class LiteralExpression<T extends TypeAtom> implements ILiteral<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = null as unknown as T;
    type = {} as unknown as IType;

    constructor(private name: LiteralAtom, private values: IExpression[], private line: LineInfo) {}

    toString() {
        if (this.values.length === 0) {
            return parenthesis(this.name);
        }
        return `(${this.name} ${this.values.join(' ')} ${this.line})`;
    }
}

class ListLiteral<T> implements ILiteral<T> {
    _isExpression = true as const;
    _type: T;

    constructor(
        private name: LiteralAtom,
        private items: IExpressionKind[],
        public type: IType,
        private line: LineInfo,
    ) {
        // Just for typing purposes
        this._type = null as unknown as T;
    }

    toString() {
        return `(${this.name} ${this.line} ${this.items.join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

class OptionLiteral implements ILiteral<TypeAtom.option> {
    _isExpression = true as const;
    _type = TypeAtom.option as const;

    type: IType;

    constructor(
        private prim: LiteralAtom.Some | LiteralAtom.None,
        private value: IExpressionKind | undefined,
        private innerType: IType = TUnknown,
        private line: LineInfo,
    ) {
        this.type = TOption(innerType);
    }

    toString(): string {
        return `(${LiteralAtom.variant} "${this.prim}" ${this.value?.toString() || `(${LiteralAtom.unit})`} ${
            this.line
        })`;
    }

    toType() {
        return this.type.toString();
    }
}

class RecordLiteral implements ILiteral<TypeAtom.record> {
    _isExpression = true as const;
    _type = TypeAtom.record as const;

    type: IType;

    constructor(private fields: Record<string, ILiteral<unknown>>, private line: LineInfo) {
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
        return `(${TypeAtom.record} ${this.line} ${this.buildFields(this.fields).join(' ')})`;
    }

    toType() {
        return this.type.toString();
    }
}

class MapLiteral<T extends TypeAtom.map | TypeAtom.big_map> implements ILiteral<T> {
    _isExpression = true as const;
    _type: T;

    type: IType;

    constructor(
        private prim: LiteralAtom.map | LiteralAtom.big_map,
        private rows: IExpression[][],
        keyType: IType,
        valueType: IType,
        private line: LineInfo,
    ) {
        if (prim === LiteralAtom.map) {
            this.type = TMap(keyType, valueType);
        } else {
            this.type = TBig_map(keyType, valueType);
        }
        // Just for typing purposes
        this._type = null as unknown as T;
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

export const Unit = (line = new LineInfo()) => new Literal<TypeAtom.unit>(LiteralAtom.unit, undefined, TUnit(), line);
export const Nat = (value: number, line = new LineInfo()) =>
    new Literal<TypeAtom.nat>(LiteralAtom.nat, value, TNat(), line);
export const Int = (value: number, line = new LineInfo()) =>
    new Literal<TypeAtom.int>(LiteralAtom.int, value, TInt(), line);
export const Mutez = (value: number, line = new LineInfo()) =>
    new Literal<TypeAtom.mutez>(LiteralAtom.mutez, value, TMutez(), line);
export const String = (value: string, line = new LineInfo()) =>
    new Literal<TypeAtom.string>(LiteralAtom.string, `"${value}"`, TString(), line);
export const Bool = (value: boolean, line = new LineInfo()) =>
    new Literal<TypeAtom.bool>(LiteralAtom.bool, capitalizeBoolean(value), TBool(), line);
export const Address = (address: string, line = new LineInfo()) =>
    new Literal<TypeAtom.address>(LiteralAtom.address, address, TAddress(), line);
export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new Literal<TypeAtom.timestamp>(LiteralAtom.timestamp, timestamp, TTimestamp(), line);
export const Chain_id = (chainID: string, line = new LineInfo()) =>
    new Literal<TypeAtom.chain_id>(LiteralAtom.chain_id_cst, chainID, TChain_id(), line);
export const Bytes = (bytes: string, line = new LineInfo()) =>
    new Literal<TypeAtom.bytes>(LiteralAtom.bytes, bytes, TBytes(), line);
export const Bls12_381_fr = (fr: string | number, line = new LineInfo()) =>
    new Literal<TypeAtom.bls12_381_fr>(LiteralAtom.bls12_381_fr, fr, TBls12_381_fr(), line);
export const Bls12_381_g1 = (bytes: string, line = new LineInfo()) =>
    new Literal<TypeAtom.bls12_381_g1>(LiteralAtom.bls12_381_g1, bytes, TBls12_381_g1(), line);
export const Bls12_381_g2 = (bytes: string, line = new LineInfo()) =>
    new Literal<TypeAtom.bls12_381_g2>(LiteralAtom.bls12_381_g2, bytes, TBls12_381_g2(), line);
export const Key = (key: string, line = new LineInfo()) =>
    new Literal<TypeAtom.key>(LiteralAtom.key, key, TKey(), line);
export const Key_hash = (key_hash: string, line = new LineInfo()) =>
    new Literal<TypeAtom.key_hash>(LiteralAtom.key_hash, key_hash, TKey_hash(), line);
export const Signature = (signature: string, line = new LineInfo()) =>
    new Literal<TypeAtom.signature>(LiteralAtom.signature, signature, TSignature(), line);

// Containers
export const List = (items: IExpressionKind[], innerType: IType, line = new LineInfo()) =>
    new ListLiteral<TypeAtom.list>(LiteralAtom.list, items, TList(innerType), line);
export const Set = (items: IExpressionKind[], innerType: IType, line = new LineInfo()) =>
    new ListLiteral<TypeAtom.set>(LiteralAtom.set, items, TSet(innerType), line);
export const Some = (value: IExpressionKind, innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(LiteralAtom.Some, value, innerType, line);
export const None = (innerType?: IType, line = new LineInfo()) =>
    new OptionLiteral(LiteralAtom.None, undefined, innerType, line);
export const Map = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown,
    valueType: IType = TUnknown,
    line = new LineInfo(),
) => new MapLiteral<TypeAtom.map>(LiteralAtom.map, rows, keyType, valueType, line);
export const Big_map = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown,
    valueType: IType = TUnknown,
    line = new LineInfo(),
) => new MapLiteral<TypeAtom.big_map>(LiteralAtom.big_map, rows, keyType, valueType, line);
export const Pair = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.tuple>(LiteralAtom.tuple, [left, right], line);

export const Record = (fields: Record<string, ILiteral<unknown>>, line = new LineInfo()) =>
    new RecordLiteral(fields, line);

const Literals = {
    // Singletons
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Bytes,
    Address,
    Timestamp,
    Chain_id,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2,
    Key,
    Key_hash,
    Signature,
    // Container types
    List,
    Set,
    Some,
    None,
    Pair,
    Map,
    Big_map,
    // Lambda,
    // Ticket,
    // Contract,
    // Sapling_state,
    // Sapling_transaction,
    // Artificial Types
    Record,
    // Variant,
};

export default Literals;
