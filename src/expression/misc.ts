import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { TUnknown } from '../type';
import { List, Unit } from './literal';
import ValueAtom from '../core/enums/literal';

/**
 * Call a onchain view.
 *
 * ```typescript
 * CallView("some_view", Address("KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT"), Nat(10), TNat());
 * ```
 *
 * @category | View
 *
 * @param name View name
 * @param address Contract address that contains the view being called
 * @param argument View argument
 * @param type The type of the view argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const CallView = (
    name: string,
    address: IExpression,
    argument: IExpression = Unit(),
    outputType: IType = TUnknown(),
    line = new LineInfo(),
): IExpression<ValueAtom.option> =>
    proxy(
        new Expression<ValueAtom.option>(ExpressionAtom.view, `"${name}"`, address, argument, outputType, line),
        Expression.proxyHandler,
    );

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
export const Concat = <T extends ValueAtom.bytes | ValueAtom.string>(values: IExpression<T>[], line = new LineInfo()) =>
    proxy(new Expression<T>(ExpressionAtom.concat, List(values), line), Expression.proxyHandler);

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
    value: IExpression<ValueAtom.bytes | ValueAtom.string | ValueAtom.list | ValueAtom.set | ValueAtom.map>,
    line = new LineInfo(),
) => proxy(new Expression<ValueAtom.nat>(ExpressionAtom.size, value, line), Expression.proxyHandler);
