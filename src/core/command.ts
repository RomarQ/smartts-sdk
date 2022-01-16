import Utils, { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IStatement } from '../typings/statement';

class C_DefineLocal implements IStatement {
    constructor(public name: string, public value: unknown, public mutable: boolean, public line = new LineInfo()) {}

    toString() {
        return `(defineLocal "${this.name}" ${this.value} ${Utils.capitalizeBoolean(this.mutable)} ${this.line})`;
    }
}
export const DefineVar = (name: string, value: unknown, mutable = true, line = new LineInfo()) =>
    new C_DefineLocal(name, value, mutable, line);

class C_Verify implements IStatement {
    constructor(public condition: IExpression, public errorMsg: IExpression, public line = new LineInfo()) {}

    toString() {
        return `(verify ${this.condition} ${this.errorMsg} ${this.line})`;
    }
}
export const Require = (condition: IExpression, errorMsg: IExpression, line = new LineInfo()) =>
    new C_Verify(condition, errorMsg, line);

class C_SetValue implements IStatement {
    name = 'set';
    constructor(public source: unknown, public value: unknown, public line = new LineInfo()) {}

    toString() {
        return `(${this.name} ${this.source} ${this.value} ${this.line})`;
    }
}
export const SetValue = (source: unknown, value: unknown, line = new LineInfo()) => new C_SetValue(source, value, line);

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
export const If = (condition: IExpression, thenStatements?: IStatement[], elseStatements?: IStatement[]) =>
    new IfStatment(condition, new LineInfo(), thenStatements, elseStatements);

const Commands = {
    DefineVar,
    Require,
    SetValue,
    If,
};

export default Commands;
