import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { TUnit } from '../type';
import { String } from './literal';
import { OpenVariant } from './variant';

/**
 * Build a contract entrypoint accessor.
 *
 * ```typescript
 * GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'some_entrypoint', TNat());
 * ```
 *
 * @category | Contract
 *
 * @param address An expression that resolves to an address value
 * @param entrypoint Contract entrypoint
 * @param argumentType Entrypoint argument type
 * @param errorMsg The value to be included in the error trace
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetContract = (
    address: IExpression,
    entrypoint = 'default',
    argumentType: IType = TUnit(),
    errorMsg: IExpression = String('CONTRACT_NOT_FOUND'),
    line = new LineInfo(),
) => OpenVariant(new Expression(ExpressionAtom.contract, entrypoint, argumentType, address, line), 'Some', errorMsg);
