import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';

export const Return = (expr: IExpression, line = new LineInfo()) => new Statement(StatementAtom.result, expr, line);

const Function = {
    Return,
};

export default Function;
