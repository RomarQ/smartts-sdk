import type { IExpression } from '../typings/expression';
import type { IType } from '../typings/type';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { LineInfo } from '../misc/utils';
import { proxy } from '../misc/proxy';

/**
 * Annotate an expression with type.
 *
 * ```typescript
 * AsType(GetVariable("some_variable"), TNat());
 * ```
 *
 * @param expression
 * @param type
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @category | Type Handling
 *
 * @returns {IExpression} An expression
 */
export const AsType = (expression: IExpression, type: IType, line = new LineInfo()): IExpression<any> =>
    proxy(new Expression(ExpressionAtom.type_annotation, expression, type, line), Expression.proxyHandler);
