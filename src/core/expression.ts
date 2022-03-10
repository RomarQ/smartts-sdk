import type { IExpression } from '../typings/expression';
import type { ILiteral } from '../typings/literal';
import type { IStatement } from '../typings/statement';
import type { IType } from '../typings/type';
import { GetProperty, LambdaArgument } from '../expression/variables';
import { capitalizeBoolean, LineInfo, parenthesis } from '../misc/utils';
import ValueAtom from './enums/literal';
import TypeAtom from './enums/type';

export class Expression<T extends ValueAtom> implements IExpression<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = {} as T;
    private args;

    constructor(public name: string, ...args: (IExpression | LineInfo | IType | string)[]) {
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

export class LiteralExpression<T extends ValueAtom> implements ILiteral<T> {
    _isExpression = true as const;
    // Used for type checking
    _type = {} as T;

    constructor(private name: T, private values: (number | string | boolean | IExpression)[], private line: LineInfo) {}

    toString() {
        switch (this.name) {
            case ValueAtom.unit:
                return parenthesis(this.name);
            case ValueAtom.nat:
            case ValueAtom.int:
            case ValueAtom.mutez:
            case ValueAtom.bytes:
            case ValueAtom.bool:
            case ValueAtom.string:
            case ValueAtom.chain_id_cst:
            case ValueAtom.timestamp:
            case ValueAtom.bls12_381_fr:
            case ValueAtom.bls12_381_g1:
            case ValueAtom.bls12_381_g2:
            case ValueAtom.key:
            case ValueAtom.key_hash:
            case ValueAtom.signature:
            case ValueAtom.address:
                return `(literal (${this.name} ${this.values.join(' ')}) ${this.line})`;
            case ValueAtom.list:
            case ValueAtom.set:
            case ValueAtom.tuple:
                return `(${this.name} ${this.line} ${this.values.join(' ')})`;
            case ValueAtom.Some:
            case ValueAtom.None:
                return `(${ValueAtom.variant} "${this.name}" ${this.values.join(' ') || `(${ValueAtom.unit})`} ${
                    this.line
                })`;
            default:
                return `(${this.name} ${this.values.join(' ')} ${this.line})`;
        }
    }
}

export class RecordLiteral implements ILiteral<ValueAtom.record> {
    _isExpression = true as const;
    // Used for type checking
    _type = {} as ValueAtom.record;

    constructor(private fields: Record<string, IExpression>, private line: LineInfo) {}

    private buildFields = (fields: Record<string, IExpression>) => {
        return Object.entries(fields).map(([field, expr]) => `(${field} ${expr.toString()})`);
    };

    toString(): string {
        return `(${TypeAtom.record} ${this.line} ${this.buildFields(this.fields).join(' ')})`;
    }
}

export class MapLiteral<T extends ValueAtom.map | ValueAtom.big_map> implements ILiteral<T> {
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
}

export class LambdaLiteral implements ILiteral<ValueAtom.lambda> {
    _isExpression = true as const;
    // Used for type checking
    _type = ValueAtom.lambda as const;
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
        return `(${ValueAtom.lambda} ${this.id} ${this.withStorage || 'None'} ${capitalizeBoolean(
            this.withOperations,
        )} "${this.argumentName}" ${this.line} (${this.statements.join(' ')}))`;
    }
}
