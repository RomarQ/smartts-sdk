const fs = require('fs');
const esbuild = require('esbuild');

// Build steps
cleanUP();
generateBundle();

/**
 * Produces the js bundle
 */
function generateBundle() {
    esbuild
        .build({
            entryPoints: ['./src/index.ts'],
            bundle: true,
            minify: true,
            sourcemap: true,
            watch: !!process.env.WATCH,
            outdir: './build',
            platform: 'node',
        })
        .then((result) => {
            if (!process.env.WATCH) {
                console.log();
                console.log('[SUCCESS]:', result);
                console.log();
            }
        })
        .catch((e) => {
            console.log();
            console.log('[FAIL]:', 'Could not produce bundle :(');
            console.log();
            console.error(e);
            process.exit(1);
        });
}

/**
 * Clean UP build files
 */
function cleanUP() {
    fs.rmdirSync('./build', { recursive: true, force: true });
}
