module.exports = {
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '.*.test\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
    coveragePathIgnorePatterns: ['<rootDir>/src/compiler/smartML.js', '<rootDir>/tests'],
};
