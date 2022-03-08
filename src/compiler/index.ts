// Load polyfills needed by SmartML
import './polyfills';

import * as SmartML from './smartML.js';
import { Contract } from '../core';
import { ILiteral } from '../typings/literal';
import TypeAtom from '../core/enums/type';

/**
 * Compile SmartML expression to a michelson smart-contract.
 *
 * @param contract a Contract instance
 *
 * @returns {Record<string, unknown> | string} JSON michelson or a error string
 */
export const compileContract = (contract: Contract): Record<string, unknown> | string => {
    try {
        return JSON.parse(SmartML.compile_contract(contract.toString()));
    } catch (error: any) {
        return SmartML.stringOfException(false, error);
    }
};

/**
 * Compile SmartML expression to a michelson lambda.
 *
 * @param expression A lambda expression
 *
 * @returns {Record<string, unknown> | string} JSON michelson or a error string
 */
interface LambdaCompilationResult {
    micheline: string;
    json: Record<string, unknown>[];
}
export const compileLambda = (expression: ILiteral<TypeAtom.lambda>): LambdaCompilationResult | string => {
    try {
        return JSON.parse(SmartML.compile_lambda(expression.toString()));
    } catch (error: any) {
        return SmartML.stringOfException(false, error);
    }
};

const CompilerAPI = {
    compileContract,
    compileLambda,
};

export default CompilerAPI;
