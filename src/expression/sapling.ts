import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
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
    state: IExpression<MichelsonType.sapling_state>,
    transition: IExpression<MichelsonType.sapling_transaction>,
    line = new LineInfo(),
): IExpression<MichelsonType.option> => new Expression(ExpressionAtom.sapling_verify_update, state, transition, line);
