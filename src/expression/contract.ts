import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { TUnit } from '../type';
import { String } from './literal';
import { OpenVariant } from './variant';

export const GetContract = (
    address: IExpression,
    entrypoint = 'default',
    argumentType: IType = TUnit(),
    errorMsg: IExpression = String('CONTRACT_NOT_FOUND'),
    line = new LineInfo(),
) => OpenVariant(new Expression(ExpressionAtom.contract, entrypoint, argumentType, address, line), 'Some', errorMsg);

const Contract = { GetContract };

export default Contract;
