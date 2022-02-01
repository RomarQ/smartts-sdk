const fs = require('fs');
const esbuild = require('esbuild');

const DIST_FOLDER = './dist';

// Build steps
cleanUP();
generateBundle([
    './src/index.ts',
    './src/smartml/index.ts',
    './src/core/index.ts',
    './src/core/type/index.ts',
    './src/core/literal/index.ts',
    './src/core/command.ts',
    './src/core/expression.ts',
]);

/**
 * Produces the js bundle
 */
function generateBundle(entryPoints) {
    esbuild.buildSync({
        entryPoints,
        bundle: true,
        outdir: DIST_FOLDER,
        platform: 'browser',
        format: 'esm',
        outExtension: { '.js': '.mjs' },
    });
    esbuild.buildSync({
        entryPoints,
        bundle: true,
        outdir: DIST_FOLDER,
        platform: 'browser',
        format: 'cjs',
        outExtension: { '.js': '.cjs' },
    });
}

/**
 * Clean UP build files
 */
function cleanUP() {
    fs.rmSync(DIST_FOLDER, { recursive: true, force: true });
}
