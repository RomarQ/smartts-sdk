import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { Proxied, proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { TUnknown } from '../type';
import { Unit } from './literal';
import { MichelsonType } from '../core/enums/type';

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
): Proxied<IExpression<MichelsonType.option>> =>
    proxy(
        new Expression<MichelsonType.option>(ExpressionAtom.view, `"${name}"`, address, argument, outputType, line),
        Expression.proxyHandler,
    );
