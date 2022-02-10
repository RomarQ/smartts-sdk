import { Expression } from '../expression';
import { LineInfo } from '../../misc/utils';
import { IExpression } from '../../typings/expression';
import { IStatement } from '../../typings/statement';
import { ILiteral } from '../../typings/literal';

class C_Verify implements IStatement {
    constructor(public condition: IExpression, public errorMsg: IExpression, public line = new LineInfo()) {}

    toString() {
        return `(verify ${this.condition} ${this.errorMsg} ${this.line})`;
    }
}
export const Require = (condition: IExpression, errorMsg: ILiteral<unknown> | IExpression, line = new LineInfo()) =>
    new C_Verify(condition, errorMsg, line);

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
        return `(ifBlock ${this.#condition} (${this.#thenStatements.join(' ')}) ${this.#line})`;
    }

    private elseBlock() {
        return `(elseBlock (${this.#elseStatements.join(' ')}))`;
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
    #list: IExpression;
    #statements: IStatement[] = [];
    #line: LineInfo;

    constructor(list: IExpression, line = new LineInfo()) {
        this.#list = list;
        this.#line = line;
    }

    public Do(callback: (iterator: IExpression) => IStatement[]) {
        const iterator = new Expression('iter', '"__ITERATOR__"', new LineInfo());
        this.#statements = callback(iterator);
        return this;
    }

    [Symbol.toPrimitive]() {
        return `(forGroup "__ITERATOR__" ${this.#list} (${this.#statements.join(' ')}) ${this.#line})`;
    }
}
export const ForEachOf = (list: IExpression, line = new LineInfo()) => new ForEachStatement(list, line);

const Control = {
    Require,
    If,
    ForEachOf,
};

export default Control;
