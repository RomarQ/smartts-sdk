import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';
import { MichelsonType } from '../core/enums/type';

/**
 * Add element to set.
 *
 * ```typescript
 * AddElementToSet(Set([Nat(1)]), Nat(2));
 * ```
 *
 * @category | Set Statements
 *
 * @param set An expression of type set.
 * @param element The element to be added.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type list.
 */
export const AddElementToSet = (set: IExpression<MichelsonType.set>, element: IExpression, line = new LineInfo()) =>
    new Statement(StatementAtom.updateSet, set, element, 'True', line);

/**
 * Remove element to set.
 *
 * ```typescript
 * RemoveElementFromSet(Set([Nat(1)]), Nat(1));
 * ```
 *
 * @category | Set expressions
 *
 * @param set An expression of type set.
 * @param element The element to be removed.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type list.
 */
export const RemoveElementFromSet = (
    set: IExpression<MichelsonType.set>,
    element: IExpression,
    line = new LineInfo(),
) => new Statement(StatementAtom.updateSet, set, element, 'False', line);
