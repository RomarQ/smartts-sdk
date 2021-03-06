import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Get map entries.
 *
 * ```typescript
 * GetMapEntries(
 *  Map(
        [
            [String("some_key_a"), Nat(1)],
            [String("some_key_b"), Nat(2)]
        ]
    )
   );
 * ```
 *
 * @category | Map expressions
 *
 * @param source Map expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type TList(TRecord({ key: ..., value: ... })).
 */
export const GetMapEntries = (source: IExpression<MichelsonType.map>, line = new LineInfo()) =>
    new Expression<MichelsonType.list>(ExpressionAtom.items, source, line);

/**
 * Get map keys.
 *
 * ```typescript
 * GetMapKeys(
 *  Map(
        [
            [String("some_key_a"), Nat(1)],
            [String("some_key_b"), Nat(2)]
        ]
    )
   );
 * ```
 *
 * @category | Map expressions
 *
 * @param source Map expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type TList(<key_type>).
 */
export const GetMapKeys = (source: IExpression<MichelsonType.map>, line = new LineInfo()) =>
    new Expression<MichelsonType.list>(ExpressionAtom.keys, source, line);

/**
 * Get map values.
 *
 * ```typescript
 * GetMapValues(
 *  Map(
        [
            [String("some_key_a"), Nat(1)],
            [String("some_key_b"), Nat(2)]
        ]
    )
   );
 * ```
 *
 * @category | Map expressions
 *
 * @param source Map expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type TList(<value_type>).
 */
export const GetMapValues = (source: IExpression<MichelsonType.map>, line = new LineInfo()) =>
    new Expression<MichelsonType.list>(ExpressionAtom.values, source, line);

/**
 * Update an entry on map or big map.
 *
 * ```typescript
 * // Update/Insert entry
 * UpdateMap(ContractStorage().metadata, String("some_key"), Some(Nat(10)));
 * // Remove entry
 * UpdateMap(ContractStorage().metadata, String("some_key"), None());
 * ```
 *
 * @category | Map expressions
 *
 * @param source A map expression.
 * @param key The map key.
 * @param value An optional value to be indexed by the given key. (The entry is removed if None() is provided as value)
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const UpdateMap = (source: IExpression, key: IExpression, value: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.update_map, source, key, value, line);

/**
 * Accesss by key the value stored in a map or big map.
 *
 * ```typescript
 * AccessMapByKey(ContractStorage().metadata, String("key"))
 * ```
 *
 * @category | Map expressions
 *
 * @param source Map expression
 * @param key Map key.
 * @param default_value An optional default value when the key does not exist.
 * @param error_message An optional value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const AccessMapByKey = (
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

/**
 * Checks if a given key exists in map or big_map.
 *
 * ```typescript
 * MapContainsKey(ContractStorage().metadata, String("sone_key"))
 * ```
 *
 * @category | Map expressions
 *
 * @param expression Map expression
 * @param key Map key.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that resolves to a boolean value.
 */
export const MapContainsKey = (expression: IExpression, key: IExpression, line = new LineInfo()) => {
    return new Expression<MichelsonType.bool>(ExpressionAtom.contains, expression, key, line);
};

const MapExpressions = {
    GetMapEntries,
    UpdateMap,
    AccessMapByKey,
    MapContainsKey,
};

export default MapExpressions;
