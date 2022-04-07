import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Get the sorted list of elements in a set.
 *
 * ```typescript
 * GetElementsFromSet(Set([Nat(1)]));
 * ```
 *
 * @category | Set expressions
 *
 * @param set An expression of type set.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type list.
 */
export const GetElementsFromSet = (set: IExpression<MichelsonType.list>, line = new LineInfo()) =>
    new Expression(ExpressionAtom.elements, set, line);

/**
 * Checks if a given element exists in a Set.
 *
 * ```typescript
 * SetContainsElement(Set([Nat(2)]), Nat(2))
 * ```
 *
 * @category | Set expressions
 *
 * @param set
 * @param element
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that resolves to a boolean value.
 */
export const SetContainsElement = (set: IExpression, element: IExpression, line = new LineInfo()) => {
    return new Expression<MichelsonType.bool>(ExpressionAtom.contains, set, element, line);
};
