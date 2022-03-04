import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';

export const GetEntries = (source: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.items, source, line), Expression.proxyHandler);
export const UpdateMap = (source: IExpression, key: IExpression, value: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.update_map, source, key, value, line), Expression.proxyHandler);

/**
 * Accesss by key the value stored in a map or big map.
 *
 * ```typescript
 * GetMapValue(ContractStorage().metadata, String("key"))
 * ```
 *
 * @param source Map expression
 * @param key Map key.
 * @param default_value An optional default value when the key does not exist.
 * @param error_message An optional value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetMapValue = (
    source: IExpression,
    key: IExpression,
    default_value?: IExpression,
    error_message?: IExpression,
    line = new LineInfo(),
) => {
    if (default_value) {
        return proxy(
            new Expression(ExpressionAtom.getItemDefault, source, key, default_value, line),
            Expression.proxyHandler,
        );
    }
    if (error_message) {
        return proxy(
            new Expression(ExpressionAtom.getItemMessage, source, key, error_message, line),
            Expression.proxyHandler,
        );
    }

    return proxy(new Expression(ExpressionAtom.getItem, source, key, line), Expression.proxyHandler);
};

const MapExpressions = {
    GetEntries,
    UpdateMap,
    GetMapValue,
};

export default MapExpressions;
