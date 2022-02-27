import { Expression } from '../core/expression';
import StatementAtom from '../core/enums/statement';
import { LineInfo } from '../misc/utils';
import { IStatement } from '../typings/statement';
import { Proxied, proxy } from '../misc/proxy';
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
    private list: IExpression;
    private iteratorName: string;
    private statements: IStatement[] = [];
    private line: LineInfo;

    constructor(list: IExpression, iteratorName = '__ITERATOR__', line = new LineInfo()) {
        this.list = list;
        this.iteratorName = iteratorName;
        this.line = line;
    }

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
        return `(forGroup "${this.iteratorName}" ${this.list} (${this.statements.join(' ')}) ${this.line})`;
    }
}
export const ForEachOf = (list: IExpression, iteratorName?: string, line = new LineInfo()) =>
    new ForEachStatement(list, iteratorName, line);

const Control = {
    Require,
    If,
    ForEachOf,
};

export default Control;
