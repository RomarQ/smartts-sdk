import { proxy } from '../../misc/proxy';
import { LineInfo } from '../../misc/utils';
import { IExpression } from '../../typings/expression';
import { IType } from '../../typings/type';
import { Expression } from './expression';

export const GetProperty = Expression.getAttr;
export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);
export const ContractStorage = () => proxy(new Expression('data'), Expression.proxyHandler);

export const SetType = (expr: IExpression, type: IType, line = new LineInfo()) =>
    new Expression('set_type', expr, type, line);

const Expressions = {
    GetLocal,
    ContractStorage,
    GetProperty,
    SetType,
};

export default Expressions;
