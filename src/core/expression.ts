import { GetProperty, LambdaArgument } from '../expression/variables';
import { capitalizeBoolean, LineInfo, parenthesis } from '../misc/utils';
import { IExpression, IExpressionKind } from '../typings/expression';
import { ILiteral } from '../typings/literal';
import { IStatement } from '../typings/statement';
import { IType } from '../typings/type';
import LiteralAtom from './enums/literal';
import TypeAtom from './enums/type';

export class Expression implements IExpression {
    _isExpression = true as const;
    args;

    constructor(public name: string, ...args: (IExpression | LineInfo | IType | string | ILiteral<any>)[]) {
        this.args = args || [];
    }

    static proxyHandler: ProxyHandler<IExpression> = {
        get: function (target, prop: string, receiver) {
            if (prop in target || typeof prop === 'symbol') {
                return Reflect.get(target, prop, receiver);
            }
            return GetProperty(target, prop);
        },
        apply: function (target, thisArg, argumentsList) {
            console.log(target, thisArg, argumentsList);
            return target;
        },
    };

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}

export class LiteralExpression<T extends LiteralAtom> implements ILiteral<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = null as unknown as T;
    type = {} as unknown as IType;

    constructor(private name: T, private values: (number | string | boolean | IExpression)[], private line: LineInfo) {}

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

export class RecordLiteral implements ILiteral<LiteralAtom.record> {
    _isExpression = true as const;
    // Used for type checking
    _type = {} as LiteralAtom.record;
    type = {} as IType;

    constructor(private fields: Record<string, IExpression>, private line: LineInfo) {}

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

export class MapLiteral<T extends LiteralAtom.map | LiteralAtom.big_map> implements ILiteral<T> {
    _isExpression = true as const;
    _type = {} as T;
    type = {} as IType;

    constructor(
        private prim: T,
        private rows: IExpression[][],
        keyType: IType,
        valueType: IType,
        private line: LineInfo,
    ) {}

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

export class LambdaLiteral implements ILiteral<LiteralAtom.lambda> {
    _isExpression = true as const;
    // Used for type checking
    _type = LiteralAtom.lambda as const;
    type = {} as unknown as IType;
    static idCounter = 0;
    private identifier: number;
    private withStorage?: 'read-write' | 'read-only';
    private withOperations = false;

    constructor(
        private statements: IStatement[],
        private inType: IType,
        private argumentName: string,
        private line: LineInfo,
    ) {
        this.identifier = ++LambdaLiteral.idCounter;
    }

    public get id(): Readonly<number> {
        return this.identifier;
    }

    public setInputType(type: IType) {
        this.inType = type;
        return this;
    }

    public code(buildStatements: (arg: IExpression) => IStatement[]) {
        const param = LambdaArgument(this.argumentName, this.inType, this.id, this.line);
        this.statements = buildStatements(param);
        return this;
    }

    toString() {
        return `(${LiteralAtom.lambda} ${this.id} ${this.withStorage || 'None'} ${capitalizeBoolean(
            this.withOperations,
        )} "${this.argumentName}" ${this.line} (${this.statements.join(' ')}))`;
    }
}
