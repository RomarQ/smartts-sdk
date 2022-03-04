import type { IExpression } from '../typings/expression';
import type { IStatement } from '../typings/statement';

import StatementAtom from '../core/enums/statement';
import ExpressionAtom from '../core/enums/expression';
import { Statement } from '../core/statement';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { Proxied, proxy } from '../misc/proxy';
import { GetVariable, Iterator, Comparison, Unit, Math } from '../expression';
import { NewVariable, SetValue } from './variable';

/**
 * Interrupt the smart-contract execution. (The whole operation is rollbacked)
 *
 * ```typescript
 * FailWith(String("SOME ERROR MESSAGE"));
 * ```
 *
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const FailWith = (errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    new Statement(StatementAtom.failwith, errorMsg, line);

/**
 * Test a condition and interrupt the smart-contract execution if the condition is false. (The whole operation is rollbacked)
 *
 * ```typescript
 * Require(LessThanOrEqual(ContractStorage(), Nat(10)), String("LessThanOrEqual to 10"));
 * ```
 *
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const Require = (condition: IExpression, errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    new Statement(StatementAtom.verify, condition, errorMsg, line);

class IfStatment implements IStatement {
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
/**
 * A (If) statement.
 *
 * ```typescript
    If(GreaterThan(ContractStorage(), Nat(5)))
        .Then([SetValue(ContractStorage(), Nat(5))])
        .Else([])
 * ```
 *
 * @param condition
 * @param thenStatements Statements to be applied if the condition is true.
 * @param elseStatements Statements to be applied if the condition is false.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const If = (
    condition: IExpression,
    thenStatements?: IStatement[],
    elseStatements?: IStatement[],
    line = new LineInfo(),
) => new IfStatment(condition, line, thenStatements, elseStatements);

class ForEachStatement implements IStatement {
    constructor(
        private list: IExpression,
        private statements: IStatement[] = [],
        private iteratorName = '__ITERATOR__',
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
/**
 * A (forEach) loop.
 *
 * ```typescript
 * ForEachOf(arg).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]);
 * ```
 *
 * @param list The list to be iterated over
 * @param statements The statements inside the loop body
 * @param iteratorName The iterator name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const ForEachOf = (list: IExpression, statements?: IStatement[], iteratorName?: string, line = new LineInfo()) =>
    new ForEachStatement(list, statements, iteratorName, line);

class WhileStatement implements IStatement {
    constructor(private condition: IExpression, private statements: IStatement[] = [], private line = new LineInfo()) {}

    public Do(statements: IStatement[]) {
        this.statements = statements;
        return this;
    }

    [Symbol.toPrimitive]() {
        return `(${StatementAtom.whileBlock} ${this.condition} (${this.statements.join(' ')}) ${this.line})`;
    }
}
/**
 * A basic (while) loop.
 *
 * ```typescript
 * While(LessThanOrEqual(ContractStorage(), Nat(10))).Do([SetValue(ContractStorage(), Add(ContractStorage(), Nat(1)))]);
 * ```
 *
 * @param condition
 * @param statements The statements inside the loop body
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const While = (condition: IExpression, statements?: IStatement[], line = new LineInfo()) =>
    new WhileStatement(condition, statements, line);

class ForStatement implements IStatement {
    constructor(
        private from: IExpression,
        private to: IExpression,
        private increment: IExpression,
        private statements: IStatement[] = [],
        private iteratorName = '__ITERATOR__',
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
        const condition = Comparison.LessThanOrEqual(GetVariable(this.iteratorName), this.to);
        const stmts = [
            ...this.statements,
            SetValue(GetVariable(this.iteratorName), Math.Add(GetVariable(this.iteratorName), this.increment)),
        ];
        return `${variable} (${StatementAtom.whileBlock} ${condition} (${stmts.join(' ')}) ${this.line})`;
    }
}
/**
 * A basic (for) loop.
 *
 * ```typescript
 * For(Nat(0), Nat(10), Nat(1)).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]);
 * ```
 *
 * @param from The initial value
 * @param to The target value
 * @param increment The incrementor
 * @param statements The statements inside the loop body
 * @param variableName The variable name being incremented inside the loop
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const For = (
    from: IExpression,
    to: IExpression,
    increment: IExpression,
    statements?: IStatement[],
    iteratorName?: string,
    line = new LineInfo(),
) => new ForStatement(from, to, increment, statements, iteratorName, line);

class VariantMatchStatement implements IStatement {
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
/**
 * Switch statement used to match branches on variant expressions.
 *
 * ```typescript
 * MatchVariant(arg)
    .Case('action1', (action) => [SetValue(ContractStorage(), action)])
    .Case('action2', (action) => [SetValue(ContractStorage(), action)])
 * ```
 *
 * @param variant Variant expression
 * @param argumentName An optional argument name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const MatchVariant = (
    variant: IExpression,
    argumentName = `__MATCH_${VariantMatchStatement.nextID}__`,
    line = new LineInfo(),
) => new VariantMatchStatement(variant, argumentName, line);

const Control = { FailWith, Require, If, ForEachOf, For, While, MatchVariant };

export default Control;
