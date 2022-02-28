import StatementAtom from '../core/enums/statement';
import { LineInfo } from '../misc/utils';
import { IStatement } from '../typings/statement';
import { Proxied } from '../misc/proxy';
import { IExpression } from '../typings/expression';
import { Statement } from '../core/statement';
import { Iterator } from '../expression/variables';

export const Require = (condition: IExpression, errorMsg: IExpression, line = new LineInfo()) =>
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
export const ForEachOf = (list: IExpression, statements?: IStatement[], iteratorName?: string, line = new LineInfo()) =>
    new ForEachStatement(list, statements, iteratorName, line);

class WhileStatement implements IStatement {
    constructor(private condition: IExpression, private statements: IStatement[] = [], private line = new LineInfo()) {}

    public Do(statements: IStatement[]) {
        this.statements = statements;
        return this;
    }

    [Symbol.toPrimitive]() {
        return `(${StatementAtom.whileGroup} ${this.condition} (${this.statements.join(' ')}) ${this.line})`;
    }
}
export const While = (list: IExpression, statements?: IStatement[], line = new LineInfo()) =>
    new WhileStatement(list, statements, line);

const Control = {
    Require,
    If,
    ForEachOf,
    While,
};

export default Control;
