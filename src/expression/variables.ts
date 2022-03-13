import ExpressionAtom from '../core/enums/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { Expression, LambdaLiteral } from '../core/expression';
import { TUnknown } from '../type';
import { IExpression } from '../typings/expression';
import ValueAtom from '../core/enums/literal';

/**
 * Access a property of a record value.
 *
 * ```typescript
 * GetProperty(ContractStorage(), "prop1")
 * ```
 *
 * @category | Variable Accessors
 *
 * @param recordExpression An expression that resolves to a record value
 * @param property Property name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetProperty = (recordExpression: IExpression, property: string, line = new LineInfo()) =>
    proxy(new Expression<any>(ExpressionAtom.attr, recordExpression, `"${property}"`, line), Expression.proxyHandler);

/**
 * Get variable value.
 *
 * ```typescript
 * GetVariable("some_variable")
 * ```
 *
 * @category | Variable Accessors
 *
 * @param name Variable name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetVariable = (name: string, line = new LineInfo()) =>
    proxy(new Expression<any>(ExpressionAtom.getLocal, `"${name}"`, line), Expression.proxyHandler);

/**
 * Get contract storage.
 *
 * ```typescript
 * ContractStorage()
 * ```
 *
 * @category | Variable Accessors
 *
 * @returns {IExpression} An expression
 */
export const ContractStorage = () => proxy(new Expression<any>('data'), Expression.proxyHandler);

/**
 * Get iterator value. (Only used inside for loops)
 *
 * ```typescript
 * Iterator("some_iterator")
 * ```
 *
 * @category | Variable Accessors
 *
 * @param name iterator name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Iterator = (name: string, line = new LineInfo()) =>
    proxy(new Expression<any>(ExpressionAtom.iter, `"${name}"`, line), Expression.proxyHandler);

/**
 * Get entrypoint/view argument.
 *
 * ```typescript
 * MethodArgument()
 * ```
 *
 * @category | Variable Accessors
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const MethodArgument = (line = new LineInfo()) =>
    proxy(new Expression<any>(ExpressionAtom.params, line), Expression.proxyHandler);

/**
 * Get lambda argument.
 *
 * ```typescript
 * LambdaArgument()
 * ```
 *
 * @category | Variable Accessors
 *
 * @param name The name of the argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const LambdaArgument = (
    name = 'lambda_arg',
    argumentType = TUnknown(),
    id = LambdaLiteral.idCounter,
    line = new LineInfo(),
) =>
    proxy(
        new Expression<any>(ExpressionAtom.lambdaParams, `${id}`, `"${name}"`, line, argumentType),
        Expression.proxyHandler,
    );

/**
 * Get operations list from the stack or an empty list otherwise.
 *
 * ```typescript
 *  // Get operations list from the stack or an empty list otherwise.
 *  GetOperations();
 * ```
 *
 * @category | Variable Accessors
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetOperations = (line = new LineInfo()) => new Expression<ValueAtom.list>(ExpressionAtom.operations, line);
