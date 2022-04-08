/**
 * @jest-environment jsdom
 */

import '../src/compiler/polyfills';
import * as smartML from '../src/compiler/smartML';

describe('Namespace (Internal)', () => {
    it('List all available methods', () => {
        expect(Object.keys(smartML)).toEqual([
            'compileContractStorage',
            'compileContract',
            'compile_contract',
            'compile_value',
            'update_michelson_view',
            'stringOfException',
            'js_string',
            'runScenarioInBrowser',
            'lazy_tab',
            'default',
        ]);
    });
});
