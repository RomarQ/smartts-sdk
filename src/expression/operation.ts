import { SetValue } from '../statement';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { AppendToList } from './list';
import { Unit } from './literal';

class OperationExpression extends Expression {
    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, AppendToList(operations, this, line), line);
    }
}

export const GetOperations = (line = new LineInfo()) => new Expression(ExpressionAtom.operations, line);

export const Transfer = (
    contract: IExpression,
    amount: IExpression,
    argument: IExpression = Unit(),
    line = new LineInfo(),
) => new OperationExpression(ExpressionAtom.transfer, argument, amount, contract, line);

export const SetDelegate = () => {
    throw new Error('NOT IMPLEMENTED');
};
export const CreateContract = () => {
    throw new Error('NOT IMPLEMENTED');
};

const Operation = { GetOperations, Transfer, SetDelegate, CreateContract };

export default Operation;
