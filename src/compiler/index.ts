// Load polyfills needed by SmartML
import './polyfills';

import * as SmartML from './smartML.js';

/**
 * @description Compile SmartML expression to a michelson smart-contract.
 * @param expression SmartML S-Expression.
 * @returns {Record<string, unknown> | string} JSON michelson or a error string
 */
export const compileContract = (expression: string): Record<string, unknown> | string => {
    try {
        return JSON.parse(SmartML.compile_contract(expression));
    } catch (error: any) {
        return SmartML.stringOfException(false, error);
    }
};

const CompilerAPI = {
    compileContract,
};

export default CompilerAPI;
