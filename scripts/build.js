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
    './src/core/expression/index.ts',
    './src/core/command.ts',
    './src/core/blockchain_operations.ts',
]);
fs.copyFileSync('package.json', `${DIST_FOLDER}/package.json`);
fs.copyFileSync('src/smartml/smartML.js', `${DIST_FOLDER}/smartml/smartML.js`);

// Fix import
const content = fs.readFileSync(`${DIST_FOLDER}/index.js`, { encoding: 'utf-8' });
fs.writeFileSync(`${DIST_FOLDER}/index.js`, content.replace('./smartML.js', './smartml/smartML.js'), {
    encoding: 'utf-8',
});

/**
 * Produces the js bundle
 */
function generateBundle(entryPoints) {
    esbuild.buildSync({
        entryPoints,
        bundle: true,
        outdir: DIST_FOLDER,
        platform: 'browser',
        format: 'cjs',
        external: ['./smartML.js'],
    });
}

/**
 * Clean UP build files
 */
function cleanUP() {
    try {
        fs.rmdirSync(DIST_FOLDER, { recursive: true, force: true });
    } catch {
        // Ignore error
    }
}
