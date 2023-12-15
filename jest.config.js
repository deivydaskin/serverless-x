/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
        "node",
        "ts",
      ],
};
