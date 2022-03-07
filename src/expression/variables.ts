import ExpressionAtom from '../core/enums/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { Expression } from '../core/expression';
import { TUnknown } from '../type';
import { LambdaLiteral } from './literal';
import { IExpression } from '../typings/expression';

/**
 * Access a property of a record value.
 *
 * ```typescript
 * GetProperty(ContractStorage(), "prop1")
 * ```
 *
 * @param recordExpression An expression that resolves to a record value
 * @param property Property name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetProperty = (recordExpression: IExpression, property: string, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.attr, recordExpression, `"${property}"`, line), Expression.proxyHandler);

/**
 * Get variable value.
 *
 * ```typescript
 * GetVariable("some_variable")
 * ```
 *
 * @param name Variable name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetVariable = (name: string, line = new LineInfo()) =>
    new Expression(ExpressionAtom.getLocal, `"${name}"`, line);

/**
 * Get contract storage.
 *
 * ```typescript
 * ContractStorage()
 * ```
 *
 * @returns {IExpression} An expression
 */
export const ContractStorage = () => proxy(new Expression('data'), Expression.proxyHandler);

/**
 * Get iterator value. (Used inside for loops)
 *
 * ```typescript
 * Iterator("some_iterator")
 * ```
 *
 * @param name iterator name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Iterator = (name: string, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.iter, `"${name}"`, line), Expression.proxyHandler);

/**
 * Get entrypoint/view argument.
 *
 * ```typescript
 * MethodArgument()
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const MethodArgument = (line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.params, line), Expression.proxyHandler);

/**
 * Get lambda argument.
 *
 * ```typescript
 * LambdaArgument()
 * ```
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
) => new Expression('lambdaParams', `${id}`, `"${name}"`, line, argumentType);

const Expressions = {
    GetVariable,
    ContractStorage,
    GetProperty,
    Iterator,
    MethodArgument,
    LambdaArgument,
};

export default Expressions;
