module.exports = {
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '.*.test\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
    // Exclude coverage on generated code
    coveragePathIgnorePatterns: ['<rootDir>/src/smartml/smartML.js'],
};
