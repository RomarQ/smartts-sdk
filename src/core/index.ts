import type { IToString, IToType } from '../typings';

import { EntryPointParam } from './expression';
import { Literal, Mutez } from './literal';
import Utils, { LineInfo } from '../misc/utils';

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
    options = {
        mock: false,
        lazy: false,
        lazyAndCodeless: false,
    };
    statements: IToString[] = [];

    constructor(public name: string, public line = new LineInfo()) {}

    config(options?: EntryPointOptions) {
        if (options?.mock) {
            this.options.mock = options.mock;
        }
        if (options?.lazy) {
            this.options.lazy = options.lazy;
        }
        if (options?.lazyAndCodeless) {
            this.options.lazyAndCodeless = options.lazyAndCodeless;
        }
        return this;
    }

    body(callback: (arg: IToString) => IToString[]) {
        this.statements = callback(EntryPointParam());
        return this;
    }

    toString() {
        const notMock = Utils.capitalizeBoolean(!this.options.mock);
        const isLazy = Utils.capitalizeBoolean(this.options.lazy);
        const isLazyAndCodeless = Utils.capitalizeBoolean(this.options.lazyAndCodeless);
        return `(${this.name} ${notMock} ${isLazy} ${isLazyAndCodeless} True ${this.line} (${this.statements.join(
            ' ',
        )}))`;
    }
}

interface ContractOptions {
    initialBalance?: Literal;
    flags?: Flag[];
}
export class Contract {
    options = {
        initialBalance: Mutez(0),
        flags: [] as Flag[],
    };
    public initialStorage: IToString & IToType;
    public entries: EntryPoint[];

    constructor(
        args: {
            initialStorage: IToString & IToType;
            entries: EntryPoint[];
        },
        public line = new LineInfo(),
    ) {
        this.initialStorage = args.initialStorage;
        this.entries = args.entries;
    }

    config(options?: ContractOptions) {
        if (options?.flags) {
            this.options.flags = options.flags;
        }
        if (options?.initialBalance) {
            this.options.initialBalance = options.initialBalance;
        }
        return this;
    }

    toString() {
        return `
        (
            template_id (static_id 0 ${this.line})
            storage ${this.initialStorage.toString()}
            storage_type (${this.initialStorage.toType()})
            messages (${this.entries.map((entry) => entry.toString()).join(' ')})
            flags (${this.options.flags.map((flag) => flag.toString())})
            privates ()
            views ()
            entry_points_layout ()
            initial_metadata ()
            balance ${this.options.initialBalance}
        )
        `;
    }
}

export * from './command';
export * from './expression';
export * from './type';
export * from './literal';
