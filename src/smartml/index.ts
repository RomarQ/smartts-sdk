// Load polyfills needed by SmartML
import './polyfills';

import * as SmartML from './smartML.js';

const compileContract = (expression: string): Record<string, unknown> | string => {
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
