import { LineInfo } from '../../misc/utils';
import { IExpression } from '../../typings/expression';
import { IStatement } from '../../typings/statement';

class C_Return implements IStatement {
    name = 'result';
    constructor(private expr: IExpression, private line: LineInfo) {}

    toString() {
        return `(${this.name} ${this.expr} ${this.line})`;
    }
}
export const Return = (expr: IExpression, line = new LineInfo()) => new C_Return(expr, line);

const Function = {
    Return,
};

export default Function;
