import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { ILiteral } from '../typings/literal';
import { IStatement } from '../typings/statement';

export class Statement implements IStatement {
    args;

    constructor(public name: string, ...args: (IExpression | LineInfo | string | ILiteral<unknown>)[]) {
        this.args = args || [];
    }

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}
