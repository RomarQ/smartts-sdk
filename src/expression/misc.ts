import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { List } from './literal';
import { MichelsonType } from '../core/enums/type';

/**
 * Concatenate a list with values of type `TString()` or `TBytes()`.
 *
 * ```typescript
 * Concat([ String("Hello"), String(" "), String("World") ]);
 * ```
 *
 * @category | Concatenation
 *
 * @param values
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const Concat = <T extends MichelsonType.bytes | MichelsonType.string>(
    values: IExpression<T>[],
    line = new LineInfo(),
) => proxy(new Expression<T>(ExpressionAtom.concat, List(values), line), Expression.proxyHandler);

/**
 * Obtain size of values with type `TString()`, `TBytes()`, `TList(...)`, `TSet(...)` and `TMap()`.
 *
 * ```typescript
 * SizeOf(String("Hello")); // Nat(5)
 * ```
 *
 * @category | Size
 *
 * @param value
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const SizeOf = (
    value: IExpression<
        MichelsonType.bytes | MichelsonType.string | MichelsonType.list | MichelsonType.set | MichelsonType.map
    >,
    line = new LineInfo(),
) => proxy(new Expression<MichelsonType.nat>(ExpressionAtom.size, value, line), Expression.proxyHandler);
