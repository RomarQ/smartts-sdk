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
 * Compile SmartML expression to michelson.
 *
 * @param expression A value expression
 *
 * @returns {Record<string, unknown> | string} JSON michelson or a error string
 */
interface ValueCompilationResult {
    micheline: string;
    json: Record<string, unknown>[];
}
export const compileValue = (expression: ILiteral<unknown>): ValueCompilationResult | string => {
    try {
        return JSON.parse(SmartML.compile_value(expression.toString()));
    } catch (error: any) {
        return SmartML.stringOfException(false, error);
    }
};

const CompilerAPI = {
    compileContract,
    compileValue,
};

export default CompilerAPI;
