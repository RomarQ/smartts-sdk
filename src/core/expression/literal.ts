import type { IType } from '../../typings/type';
import type { ILiteral } from '../../typings/literal';

import { capitalizeBoolean, LineInfo, parenthesis, quote } from '../../misc/utils';
import { TUnknown, TRecord, TMap, TBig_map } from '../type';
import { IExpression, IExpressionKind } from '../../typings/expression';
import { Layout } from '../enums/layout';
import LiteralAtom from '../enums/literal';
import TypeAtom from '../enums/type';
import { IStatement } from '../../typings/statement';
import { Expression } from '.';

class LiteralExpression<T extends TypeAtom> implements ILiteral<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = null as unknown as T;
    type = {} as unknown as IType;

    constructor(
        private name: LiteralAtom,
        private values: (number | string | boolean | IExpression)[],
        private line: LineInfo,
    ) {}

    toString() {
        switch (this.name) {
            case LiteralAtom.unit:
                return parenthesis(this.name);
            case LiteralAtom.nat:
            case LiteralAtom.int:
            case LiteralAtom.mutez:
            case LiteralAtom.bytes:
            case LiteralAtom.bool:
            case LiteralAtom.string:
            case LiteralAtom.chain_id_cst:
            case LiteralAtom.timestamp:
            case LiteralAtom.bls12_381_fr:
            case LiteralAtom.bls12_381_g1:
            case LiteralAtom.bls12_381_g2:
            case LiteralAtom.key:
            case LiteralAtom.key_hash:
            case LiteralAtom.signature:
            case LiteralAtom.address:
                return `(literal (${this.name} ${this.values.join(' ')}) ${this.line})`;
            case LiteralAtom.list:
            case LiteralAtom.set:
            case LiteralAtom.tuple:
                return `(${this.name} ${this.line} ${this.values.join(' ')})`;
            case LiteralAtom.Some:
            case LiteralAtom.None:
                return `(${LiteralAtom.variant} "${this.name}" ${this.values.join(' ') || `(${LiteralAtom.unit})`} ${
                    this.line
                })`;
            default:
                return `(${this.name} ${this.values.join(' ')} ${this.line})`;
        }
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

class LambdaLiteral implements ILiteral<TypeAtom.lambda> {
    _isExpression = true as const;
    // Used for type checking
    _type = TypeAtom.lambda as const;
    type = {} as unknown as IType;
    static idCounter = 0;
    private id: number;
    private withStorage = false;
    private withOperations = false;
    private statements: IStatement[] = [];

    constructor(private inType: IType, private line: LineInfo) {
        this.id = ++LambdaLiteral.idCounter;
    }

    public inputType(type: IType) {
        this.inType = type;
        return this;
    }

    public code(buildStatements: (arg: IExpression) => IStatement[]) {
        const param = new Expression('lambdaParams', `${this.id}`, '"arg"', new LineInfo(), this.inType);
        this.statements = buildStatements(param);
        return this;
    }

    toString() {
        return `(lambda ${this.id} ${capitalizeBoolean(this.withStorage)} ${capitalizeBoolean(
            this.withOperations,
        )} "arg" ${this.line} (${this.statements.join(' ')}))`;
    }
}

// Singletons
export const Unit = (line = new LineInfo()) => new LiteralExpression<TypeAtom.unit>(LiteralAtom.unit, [], line);
export const Nat = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.nat>(LiteralAtom.nat, [value], line);
export const Int = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.int>(LiteralAtom.int, [value], line);
export const Mutez = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.mutez>(LiteralAtom.mutez, [value], line);
export const String = (value: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.string>(LiteralAtom.string, [quote(value)], line);
export const Bool = (value: boolean, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bool>(LiteralAtom.bool, [capitalizeBoolean(value)], line);
export const Address = (address: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.address>(LiteralAtom.address, [address], line);
export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.timestamp>(LiteralAtom.timestamp, [timestamp], line);
export const Chain_id = (chainID: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.chain_id>(LiteralAtom.chain_id_cst, [chainID], line);
export const Bytes = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bytes>(LiteralAtom.bytes, [bytes], line);
export const Bls12_381_fr = (fr: string | number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_fr>(LiteralAtom.bls12_381_fr, [fr], line);
export const Bls12_381_g1 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_g1>(LiteralAtom.bls12_381_g1, [bytes], line);
export const Bls12_381_g2 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_g2>(LiteralAtom.bls12_381_g2, [bytes], line);
export const Key = (key: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.key>(LiteralAtom.key, [key], line);
export const Key_hash = (key_hash: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.key_hash>(LiteralAtom.key_hash, [key_hash], line);
export const Signature = (signature: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.signature>(LiteralAtom.signature, [signature], line);
// Containers
export const List = (items: IExpression[], line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.list>(LiteralAtom.list, items, line);
export const Set = (items: IExpression[], line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.set>(LiteralAtom.set, items, line);
export const Some = (value: IExpressionKind, line = new LineInfo()) =>
    new LiteralExpression(LiteralAtom.Some, [value], line);
export const None = (line = new LineInfo()) => new LiteralExpression(LiteralAtom.None, [], line);
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
export const Ticket = (content: IExpression, amount: LiteralExpression<TypeAtom.nat>, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.ticket>(LiteralAtom.ticket, [content, amount], line);
export const Sapling_state = (memo: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.sapling_state>(LiteralAtom.sapling_state, [memo], line);
export const Lambda = (inType: IType = TUnknown, line = new LineInfo()) => new LambdaLiteral(inType, line);
export const Record = (fields: Record<string, ILiteral<unknown>>, line = new LineInfo()) =>
    new RecordLiteral(fields, line);
export const Variant = (field: string, value: IExpression, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.variant>(LiteralAtom.variant, [field, value], line);

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
    // Containers
    List,
    Set,
    Some,
    None,
    Pair,
    Map,
    Big_map,
    // Lambda,
    Ticket,
    Sapling_state,
    Record,
    Variant,
};

export default Literals;
