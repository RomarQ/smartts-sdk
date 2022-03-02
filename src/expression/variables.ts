import ExpressionAtom from '../core/enums/expression';
import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { Expression } from '../core/expression';
import { TUnknown } from '../type';

export const GetProperty = Expression.getAttr;

/**
 * @description Get variable value.
 *
 * @param name Variable name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetVariable = (name: string, line = new LineInfo()) =>
    new Expression(ExpressionAtom.getLocal, `"${name}"`, line);

/**
 * @description Get contract storage.
 *
 * @returns {IExpression} An expression
 */
export const ContractStorage = () => proxy(new Expression('data'), Expression.proxyHandler);

/**
 * @description Get iterator value.
 *
 * @param name iterator name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Iterator = (name: string, line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.iter, `"${name}"`, line), Expression.proxyHandler);

/**
 * @description Get entrypoint/view argument.
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const MethodArgument = (line = new LineInfo()) =>
    proxy(new Expression(ExpressionAtom.params, line), Expression.proxyHandler);

/**
 * @description Get lambda argument.
 *
 * @param name The name of the argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const LambdaArgument = (name = 'lambda_arg', argumentType = TUnknown(), id = 0, line = new LineInfo()) =>
    new Expression('lambdaParams', `${id}`, `"${name}"`, line, argumentType);

export const SetType = (expr: IExpression, type: IType, line = new LineInfo()) =>
    new Expression('set_type', expr, type, line);

const Expressions = {
    GetVariable,
    ContractStorage,
    GetProperty,
    Iterator,
    MethodArgument,
    LambdaArgument,
    SetType,
};

export default Expressions;
