/**
 * @jest-environment jsdom
 */

import '../src/smartml/polyfills';
import * as smartML from '../src/smartml/smartML';

describe('Namespace (Private)', () => {
    it('List all available methods', () => {
        expect(Object.keys(smartML)).toEqual([
            'importType',
            'importContract',
            'compileContractStorage',
            'compileContract',
            'compile_contract',
            'update_michelson_view',
            'buildTransfer',
            'stringOfException',
            'js_string',
            'callGui',
            'explore',
            'runSmartMLScript',
            'runSmartMLScriptScenarioName',
            'runScenarioInBrowser',
            'lazy_tab',
            'default',
        ]);
    });
});
