import type { ILiteral } from '../typings/literal';
import type { IType } from '../typings/type';

import { Expression, SetType } from './expression';
import { Mutez, Unit } from './literal';
import Utils, { LineInfo } from '../misc/utils';
import { IStatement } from '../typings/statement';
import { IExpression } from '../typings/expression';

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
        initialBalance: ILiteral;
        flags: Flag[];
    } = {
        initialBalance: Mutez(0),
        flags: [],
    };

    #storage_type?: IType;
    #storage: ILiteral = Unit();
    #entries: EntryPoint[] = [];

    constructor(public line = new LineInfo()) {}

    public setStorageType(type: IType) {
        this.#storage_type = type;
        return this;
    }

    public setStorage(storage: ILiteral) {
        this.#storage = storage;
        return this;
    }

    public addEntrypoint(entrypoint: EntryPoint) {
        this.#entries.push(entrypoint);
        return this;
    }

    public setConfig(options?: { initialBalance?: ILiteral; flags?: Flag[] }) {
        if (options?.flags) {
            this.#options.flags = options.flags;
        }
        if (options?.initialBalance) {
            this.#options.initialBalance = options.initialBalance;
        }
        return this;
    }

    public get storage(): Readonly<ILiteral> {
        return this.#storage;
    }

    public get entrypoints(): Readonly<EntryPoint[]> {
        return this.#entries;
    }

    public get config(): Readonly<{
        initialBalance: ILiteral;
        flags: Flag[];
    }> {
        return this.#options;
    }

    public toString() {
        return `
        (
            template_id (static_id 0 ${this.line})
            storage ${this.#storage.toString()}
            storage_type (${this.#storage_type ? this.#storage_type.toString() : '()'})
            messages (${this.#entries.join(' ')})
            flags (${this.#options.flags.map((flag) => flag.toString())})
            privates ()
            views ()
            entry_points_layout ()
            initial_metadata ()
            balance ${this.#options.initialBalance}
        )
        `;
    }
}

export { default as Command } from './command';
export { default as Expression } from './expression';
export { default as Type } from './type';
export { default as Literal } from './literal';
export * from './blockchain_operations';
