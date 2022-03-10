// Load polyfills needed by SmartML
import './polyfills';

import * as SmartML from './smartML.js';
import { Contract } from '../core';
import { ILiteral } from '../typings/literal';

interface CompilationResult {
    micheline: string;
    json: Record<string, unknown>[];
}

/**
 * Compile SmartML expression to a michelson smart-contract.
 *
 * @param contract a Contract instance
 *
 * @returns {CompilationResult} Compilation result
 */
export const compileContract = (contract: Contract): CompilationResult => {
    try {
        return JSON.parse(SmartML.compile_contract(contract[Symbol.toPrimitive]()));
    } catch (error: any) {
        console.debug(error);
        throw new Error(SmartML.stringOfException(false, error));
    }
};

/**
 * Compile SmartML expression to michelson.
 *
 * @param expression A value expression
 *
 * @returns {CompilationResult} Compilation result
 */
export const compileValue = (expression: ILiteral): CompilationResult => {
    try {
        return JSON.parse(SmartML.compile_value(expression.toString()));
    } catch (error: any) {
        throw new Error(SmartML.stringOfException(false, error));
    }
};

const CompilerAPI = {
    compileContract,
    compileValue,
};

export default CompilerAPI;
