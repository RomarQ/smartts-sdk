import { MethodArgument, Mutez } from '../expression';
import Utils, { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { ILiteral } from '../typings/literal';
import { IType } from '../typings/type';
import { IStatement } from '../typings/statement';
import { Expression } from './expression';
import { Proxied, proxy } from '../misc/proxy';
import { SetType } from '../statement';
import { TUnit, TUnknown } from '../type';
import LiteralAtom from './enums/literal';

abstract class View {
    public name: string;
    protected inType: IType = TUnknown();
    protected statements: IStatement[] = [];
    protected line: LineInfo;

    constructor(name: string, line = new LineInfo()) {
        this.name = name;
        this.line = line;
    }

    public setInputType(type: IType) {
        this.inType = type;
        return this;
    }

    public code(callback: (arg: Proxied<IExpression>) => IStatement[]) {
        this.statements = [...this.statements, ...callback(this.viewArgument)];
        return this;
    }

    protected get viewArgument() {
        return proxy(MethodArgument(this.line), Expression.proxyHandler);
    }
}

export class OnChainView extends View {
    [Symbol.toPrimitive]() {
        const hasParams = Utils.capitalizeBoolean(true);
        const isPure = Utils.capitalizeBoolean(false);
        const stmts = [SetType(this.viewArgument, this.inType), ...this.statements];
        return `(onchain ${this.name} ${hasParams} ${this.line} ${isPure} ${'""'} (${stmts.join(' ')}))`;
    }
}

class OffChainView extends View {
    [Symbol.toPrimitive]() {
        const hasParams = Utils.capitalizeBoolean(true);
        const isPure = Utils.capitalizeBoolean(false);
        const stmts = [SetType(this.viewArgument, this.inType), ...this.statements];
        return `(offchain ${this.name} ${hasParams} ${this.line} ${isPure} ${''} (${stmts.join(' ')}))`;
    }
}

interface EntryPointOptions {
    mock?: boolean;
    lazy?: boolean;
    lazyAndCodeless?: boolean;
}
/**
 * Class that represents a contract entrypoint.
 *
 * ```typescript
   new EntryPoint('ep1')
    .setInputType(TNat())
    .code((arg) => [
        SetValue(ContractStorage(), arg);
    ])
 * ```
 */
export class EntryPoint {
    public name: string;
    #options = {
        mock: false,
        lazy: false,
        lazyAndCodeless: false,
    };
    #inType: IType = TUnit();
    #statements: IStatement[] = [];
    #line: LineInfo;

    constructor(name: string, line = new LineInfo()) {
        this.name = name;
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

    public setInputType(type: IType) {
        this.#inType = type;
        return this;
    }

    public code(callback: (arg: Proxied<IExpression>) => IStatement[]) {
        this.#statements = [...this.#statements, ...callback(this.entrypointArgument)];
        return this;
    }

    private get entrypointArgument() {
        return proxy(MethodArgument(this.#line), Expression.proxyHandler);
    }

    [Symbol.toPrimitive]() {
        const notMock = Utils.capitalizeBoolean(!this.#options.mock);
        const isLazy = Utils.capitalizeBoolean(this.#options.lazy);
        const isLazyAndCodeless = Utils.capitalizeBoolean(this.#options.lazyAndCodeless);
        const hasParams = Utils.capitalizeBoolean(true);
        const stmts = [SetType(this.entrypointArgument, this.#inType), ...this.#statements];
        return `(${this.name} ${notMock} ${isLazy} ${isLazyAndCodeless} ${hasParams} ${this.#line} (${stmts.join(
            ' ',
        )}))`;
    }
}

/**
 * Class that represents a contract configuration flag.
 *
 * ```typescript
 * new Contract().setConfig({ flags: [new Flag('erase-comments')] });
 * ```
 */
export class Flag {
    args: string[] = [];

    constructor(public flag: string, ...args: string[]) {
        this.args = args;
    }

    [Symbol.toPrimitive]() {
        return `(${[this.flag, ...this.args].join(' ')})`;
    }
}

/**
 * Class that represents a contract.
 *
 * ```typescript
 * new Contract()
    .setStorage(Nat(1))
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), arg);
            ]),
    )
    .setConfig({ flags: [new Flag('erase-comments')] });
 * ```
 */
export class Contract {
    #options: {
        initialBalance: IExpression;
        flags: Flag[];
    } = {
        initialBalance: Mutez(0),
        flags: [],
    };

    #line: LineInfo;
    #storage_type: IType = TUnknown();
    #storage?: IExpression;
    #entries: Record<string, EntryPoint> = {};
    #onChainViews: Record<string, View> = {};

    constructor(line = new LineInfo()) {
        this.#line = line;
    }

    public setStorageType(type: IType) {
        this.#storage_type = type;
        return this;
    }

    public setStorage(storage: ILiteral) {
        this.#storage = storage;
        return this;
    }

    public addEntrypoint(entrypoint: EntryPoint) {
        this.#entries[entrypoint.name] = entrypoint;
        return this;
    }
    public removeEntrypoint(entrypointName: string) {
        delete this.#entries[entrypointName];
        return this;
    }

    public addView(view: View) {
        if (view instanceof OnChainView) {
            this.#onChainViews[view.name] = view;
        }
        return this;
    }
    public removeView(viewName: string) {
        delete this.#onChainViews[viewName];
        return this;
    }

    public setConfig(options?: { initialBalance?: ILiteral<LiteralAtom.mutez>; flags?: Flag[] }) {
        if (options?.flags) {
            this.#options.flags = options.flags;
        }
        if (options?.initialBalance) {
            this.#options.initialBalance = options.initialBalance;
        }
        return this;
    }

    public get storage(): Readonly<IExpression> | null {
        return this.#storage || null;
    }

    public get entrypoints(): Readonly<EntryPoint[]> {
        return Object.values(this.#entries);
    }

    public get onChainViews(): Readonly<View[]> {
        return Object.values(this.#onChainViews);
    }

    public get config(): Readonly<{
        initialBalance: IExpression;
        flags: Flag[];
    }> {
        return this.#options;
    }

    [Symbol.toPrimitive]() {
        return `
        (
            template_id (static_id 0 ${this.#line})
            storage ${this.#storage || '()'}
            storage_type (${this.#storage_type || '()'})
            messages (${this.entrypoints.join(' ')})
            flags (${this.#options.flags.join(' ')})
            privates ()
            views (${this.onChainViews.join(' ')})
            entry_points_layout ()
            initial_metadata ()
            balance ${this.#options.initialBalance}
        )
        `;
    }
}
