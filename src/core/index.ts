import type { ILiteral } from '../typings/literal';
import type { IType } from '../typings/type';

import Utils, { LineInfo } from '../misc/utils';
import { IStatement } from '../typings/statement';
import { IExpression } from '../typings/expression';
import { Expression } from './expression';
import { SetType, Mutez, Unit } from '../expression';

export class Flag {
    args: string[] = [];

    constructor(public flag: string, ...args: string[]) {
        this.args = args;
    }

    toString() {
        return `(${this.flag}${(' ' + this.args.join(' ')).trim()})`;
    }
}

interface EntryPointOptions {
    mock?: boolean;
    lazy?: boolean;
    lazyAndCodeless?: boolean;
}
export class EntryPoint {
    #options = {
        mock: false,
        lazy: false,
        lazyAndCodeless: false,
    };
    #inType?: IType;
    #statements: IStatement[] = [];
    #name: string;
    #line: LineInfo;

    constructor(name: string, line = new LineInfo()) {
        this.#name = name;
        this.#line = line;
    }

    public config(options?: EntryPointOptions) {
        if (options?.mock) {
            this.#options.mock = options.mock;
        }
        if (options?.lazy) {
            this.#options.lazy = options.lazy;
        }
        if (options?.lazyAndCodeless) {
            this.#options.lazyAndCodeless = options.lazyAndCodeless;
        }
        return this;
    }

    public inputType(type: IType) {
        this.#inType = type;
        return this;
    }

    public code(callback: (arg: IExpression) => IStatement[]) {
        const param = new Expression('params', new LineInfo());
        if (this.#inType) {
            // Add type annotation if an input type was provided
            this.#statements = [SetType(param, this.#inType)];
        }
        this.#statements = [...this.#statements, ...callback(param)];
        return this;
    }

    [Symbol.toPrimitive]() {
        const notMock = Utils.capitalizeBoolean(!this.#options.mock);
        const isLazy = Utils.capitalizeBoolean(this.#options.lazy);
        const isLazyAndCodeless = Utils.capitalizeBoolean(this.#options.lazyAndCodeless);
        const hasParams = Utils.capitalizeBoolean(!!this.#inType);
        return `(${this.#name} ${notMock} ${isLazy} ${isLazyAndCodeless} ${hasParams} ${
            this.#line
        } (${this.#statements.join(' ')}))`;
    }
}

export class Contract {
    #options: {
        initialBalance: IExpression;
        flags: Flag[];
    } = {
        initialBalance: Mutez(0),
        flags: [],
    };

    #storage_type?: IType;
    #storage: IExpression = Unit();
    #entries: EntryPoint[] = [];

    constructor(public line = new LineInfo()) {}

    public setStorageType(type: IType) {
        this.#storage_type = type;
        return this;
    }

    public setStorage(storage: ILiteral<unknown>) {
        this.#storage = storage;
        return this;
    }

    public addEntrypoint(entrypoint: EntryPoint) {
        this.#entries.push(entrypoint);
        return this;
    }

    public setConfig(options?: { initialBalance?: ILiteral<unknown>; flags?: Flag[] }) {
        if (options?.flags) {
            this.#options.flags = options.flags;
        }
        if (options?.initialBalance) {
            this.#options.initialBalance = options.initialBalance;
        }
        return this;
    }

    public get storage(): Readonly<IExpression> {
        return this.#storage;
    }

    public get entrypoints(): Readonly<EntryPoint[]> {
        return this.#entries;
    }

    public get config(): Readonly<{
        initialBalance: IExpression;
        flags: Flag[];
    }> {
        return this.#options;
    }

    public toString() {
        return `
        (
            template_id (static_id 0 ${this.line})
            storage ${this.#storage}
            storage_type (${this.#storage_type || '()'})
            messages (${this.#entries.join(' ')})
            flags (${this.#options.flags.join(' ')})
            privates ()
            views ()
            entry_points_layout ()
            initial_metadata ()
            balance ${this.#options.initialBalance}
        )
        `;
    }
}
