import { proxy } from '../../misc/proxy';
import { LineInfo } from '../../misc/utils';
import { IExpression } from '../../typings/expression';
import ExpressionAtom from '../enums/expression';
import { Expression } from './expression';

export const GetEntries = (source: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.items, source, line), Expression.proxyHandler);
export const UpdateMap = (source: IExpression, key: IExpression, value: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.update_map, source, key, value, line), Expression.proxyHandler);
export const GetItem = (source: IExpression, key: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.getItem, key, source, line), Expression.proxyHandler);

const MapExpressions = {
    GetEntries,
    UpdateMap,
    GetItem,
};

export default MapExpressions;
