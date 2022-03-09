import type { IExpression } from '../typings/expression';
import type { ILiteral } from '../typings/literal';
import type { IStatement } from '../typings/statement';
import type { IType } from '../typings/type';
import { LineInfo } from '../misc/utils';
import StatementAtom from './enums/statement';
import { Expression } from './expression';
import ExpressionAtom from './enums/expression';
import { Proxied, proxy } from '../misc/proxy';
import { Add, GetVariable, Iterator, LessThanOrEqual } from '../expression';
import { NewVariable, SetValue } from '../statement';

export class Statement implements IStatement {
    args;

    constructor(public name: string, ...args: (IExpression | IType | LineInfo | string | ILiteral)[]) {
        this.args = args || [];
    }

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}

export class IfStatment implements IStatement {
    #condition: IExpression;
    #thenStatements: IStatement[];
    #elseStatements: IStatement[];
    #line: LineInfo;

    constructor(
        condition: IExpression,
        line = new LineInfo(),
        thenStatements?: IStatement[],
        elseStatements?: IStatement[],
    ) {
        this.#condition = condition;
        this.#thenStatements = thenStatements || [];
        this.#elseStatements = elseStatements || [];
        this.#line = line;
    }

    public Then(statements: IStatement[]) {
        this.#thenStatements = statements;
        return this;
    }

    public Else(statements: IStatement[]) {
        this.#elseStatements = statements;
        return this;
    }

    private ifBlock() {
        return `(${StatementAtom.ifBlock} ${this.#condition} (${this.#thenStatements.join(' ')}) ${this.#line})`;
    }

    private elseBlock() {
        return `(${StatementAtom.elseBlock} (${this.#elseStatements.join(' ')}))`;
    }

    [Symbol.toPrimitive]() {
        let expression = this.ifBlock();
        if (this.#elseStatements.length) {
            expression = `${expression} ${this.elseBlock()}`;
        }
        return expression;
    }
}

export class VariantMatchStatement implements IStatement {
    static idCounter = 0;
    private cases: Record<string, IStatement[]> = {};

    static get nextID() {
        return ++VariantMatchStatement.idCounter;
    }

    constructor(private variant: IExpression, private argumentName: string, private line = new LineInfo()) {}

    public setArgumentName(argumentName: string): this {
        this.argumentName = argumentName;
        return this;
    }

    public Case(branch: string, buildStatements: (arg: Proxied<IExpression>) => IStatement[]): this {
        const variantArgument = this.variantArgument(`${this.argumentName}_${branch}`, this.line);
        this.cases[branch] = buildStatements(variantArgument);
        return this;
    }

    private caseArgument(argumentName: string, line: LineInfo) {
        return new Expression(ExpressionAtom.cases_arg, `"${argumentName}"`, line);
    }

    private variantArgument(argumentName: string, line: LineInfo) {
        return proxy(new Expression(ExpressionAtom.variant_arg, `"${argumentName}"`, line), Expression.proxyHandler);
    }

    [Symbol.toPrimitive]() {
        const caseArgument = this.caseArgument(this.argumentName, this.line);
        const matchCases = Object.keys(this.cases).map((branch) => {
            return new Statement(
                StatementAtom.match,
                caseArgument,
                branch,
                `"${this.argumentName}_${branch}"`,
                `(${this.cases[branch].join(' ')})`,
                this.line,
            );
        });
        return `(${StatementAtom.match_cases} ${this.variant} "${this.argumentName}" (${matchCases.join(' ')}) ${
            this.line
        })`;
    }
}

export class WhileStatement implements IStatement {
    constructor(private condition: IExpression, private statements: IStatement[] = [], private line = new LineInfo()) {}

    public Do(statements: IStatement[]) {
        this.statements = statements;
        return this;
    }

    [Symbol.toPrimitive]() {
        return `(${StatementAtom.whileBlock} ${this.condition} (${this.statements.join(' ')}) ${this.line})`;
    }
}

export class ForStatement implements IStatement {
    static idCounter = 0;

    static get nextID() {
        return ++VariantMatchStatement.idCounter;
    }

    constructor(
        private from: IExpression,
        private to: IExpression,
        private increment: IExpression,
        private statements: IStatement[] = [],
        private iteratorName: string,
        private line = new LineInfo(),
    ) {}

    public setIteratorName(iteratorName: string): this {
        this.iteratorName = iteratorName;
        return this;
    }

    public Do(callback: (iterator: Proxied<IExpression>) => IStatement[], line = new LineInfo()) {
        const iterator = GetVariable(this.iteratorName, line);
        this.statements = callback(iterator);
        return this;
    }

    [Symbol.toPrimitive]() {
        const variable = NewVariable(this.iteratorName, this.from);
        const condition = LessThanOrEqual(GetVariable(this.iteratorName), this.to);
        const stmts = [
            ...this.statements,
            SetValue(GetVariable(this.iteratorName), Add(GetVariable(this.iteratorName), this.increment)),
        ];
        return `${variable} (${StatementAtom.whileBlock} ${condition} (${stmts.join(' ')}) ${this.line})`;
    }
}

export class ForEachStatement implements IStatement {
    static idCounter = 0;

    static get nextID() {
        return ++VariantMatchStatement.idCounter;
    }

    constructor(
        private list: IExpression,
        private statements: IStatement[],
        private iteratorName: string,
        private line = new LineInfo(),
    ) {}

    public setIteratorName(iteratorName: string): this {
        this.iteratorName = iteratorName;
        return this;
    }

    public Do(callback: (iterator: Proxied<IExpression>) => IStatement[], line = new LineInfo()) {
        const iterator = Iterator(this.iteratorName, line);
        this.statements = callback(iterator);
        return this;
    }

    [Symbol.toPrimitive]() {
        return `(${StatementAtom.forGroup} "${this.iteratorName}" ${this.list} (${this.statements.join(' ')}) ${
            this.line
        })`;
    }
}
