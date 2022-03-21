import { TUnknown } from '../type';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { MichelsonType } from '../core/enums/type';

/**
 * Serializes any value of packable type to its optimized binary representation, of type `TBytes()`.
 *
 * ```typescript
 * Pack(Nat(1));
 * ```
 *
 * @category Serialization
 *
 * @param expression An expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TBytes()`.
 */
export const Pack = (expression: IExpression, line = new LineInfo()) =>
    proxy(new Expression<MichelsonType.bytes>(ExpressionAtom.pack, expression, line), Expression.proxyHandler);

/**
 * Deserialize a value of type `TBytes()` into the corresponding Michelson value of type `TOption(...)`.
 *
 * ```typescript
 * Unpack(Bytes("0x05070707070100000004746f746f020000000800030007000900010200000006000100020003"));
 * ```
 *
 * @category Serialization
 *
 * @param expression An expression that evaluates to type `TBytes()`
 * @param type The type of the deserialized value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(<type>)`
 */
export const Unpack = (expression: IExpression<MichelsonType.bytes>, type: IType = TUnknown(), line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.unpack, expression, type, line), Expression.proxyHandler);

export const Serialization = {
    Pack,
    Unpack,
};
