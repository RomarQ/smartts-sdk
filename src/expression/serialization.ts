import { TUnknown } from '..';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';

/**
 * Serializes any value of packable type to its optimized binary representation, of type `TBytes()`.
 *
 * ```typescript
 * Pack(Nat(1));
 * ```
 *
 * @category | Serialization
 *
 * @param expression An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TBytes()`.
 */
export const Pack = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.pack, expression, line), Expression.proxyHandler);

/**
 * Deserialize a value of type `TBytes()` into the corresponding Michelson value of type `TOption(...)`.
 *
 * ```typescript
 * Unpack(Bytes("0x05000000"));
 * ```
 *
 * @category | Serialization
 *
 * @param expression An expression that evaluates to type `TBytes()`
 * @param type The type of the deserialized value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(<type>)`
 */
export const Unpack = (expression: IExpression, type: IType = TUnknown(), line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.unpack, expression, type, line), Expression.proxyHandler);

export const Serialization = {
    Pack,
    Unpack,
};
