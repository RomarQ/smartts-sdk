import { proxy } from '../misc/proxy';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';
import { Expression } from '../core/expression';

export const GetProperty = Expression.getAttr;

/**
 * @description Get variable value.
 *
 * @param name Variable name
 * @param line An optional line for error information
 *
 * @returns {IExpression} An expression
 */
export const GetVariable = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

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
 * @param line An optional line for error information
 *
 * @returns {IExpression} An expression
 */
export const Iterator = (name: string, line = new LineInfo()) =>
    proxy(new Expression('iter', `"${name}"`, line), Expression.proxyHandler);

export const SetType = (expr: IExpression, type: IType, line = new LineInfo()) =>
    new Expression('set_type', expr, type, line);

const Expressions = {
    GetVariable,
    ContractStorage,
    GetProperty,
    Iterator,
    SetType,
};

export default Expressions;
