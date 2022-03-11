import ExpressionAtom from '../core/enums/expression';
import ValueAtom from '../core/enums/literal';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Creates an empty Sapling state.
 *
 * ```typescript
 * EmptySaplingState(8);
 * ```
 *
 * @category Sapling
 *
 * @param memo size
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TSapling_state()`
 */
export const EmptySaplingState = (memo: number, line = new LineInfo()) =>
    new Expression(ExpressionAtom.sapling_empty_state, memo, line);

/**
 * Verify and apply a transaction on a Sapling state.
 *
 * ```typescript
 * ApplySaplingUpdate(ContractStorage().state, transition);
 * ```
 *
 * @category Sapling
 *
 * @param state A sapling state
 * @param transition A sapling transition
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TPair(TInt(), TSaplingState(@memo_size)))`
 */
export const ApplySaplingUpdate = (
    state: IExpression<ValueAtom.sapling_state>,
    transition: IExpression<ValueAtom.sapling_transaction>,
    line = new LineInfo(),
): IExpression<ValueAtom.option> => new Expression(ExpressionAtom.sapling_verify_update, state, transition, line);
