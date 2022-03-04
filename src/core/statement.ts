import type { IExpression } from '../typings/expression';
import type { ILiteral } from '../typings/literal';
import type { IStatement } from '../typings/statement';
import type { IType } from '../typings/type';
import type { LineInfo } from '../misc/utils';

export class Statement implements IStatement {
    args;

    constructor(public name: string, ...args: (IExpression | IType | LineInfo | string | ILiteral<unknown>)[]) {
        this.args = args || [];
    }

    toString() {
        return `(${[this.name, ...this.args].join(' ')})`;
    }
}
