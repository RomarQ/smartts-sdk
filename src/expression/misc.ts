import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
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
export const Concat = (list: IExpression<MichelsonType.list>, line = new LineInfo()) =>
    new Expression(ExpressionAtom.concat, list, line);

/**
 * Slice a value of type `TBytes()` from offset for length characters.
 *
 * ```typescript
 * Slice(Bytes("0x0a1111"), Nat(1), Nat(2)); // 0x1111
 * ```
 *
 * @category | Slicing
 *
 * @param bytes
 * @param offset
 * @param length
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TBytes())`.
 */
export const Slice = (
    bytes: IExpression<MichelsonType.bytes | MichelsonType.string>,
    offset: IExpression<MichelsonType.nat>,
    length: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => new Expression<MichelsonType.option>(ExpressionAtom.slice, offset, length, bytes, line);

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
