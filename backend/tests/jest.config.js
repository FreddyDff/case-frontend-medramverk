export default {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],
    collectCoverageFrom: [
      '**/*.js',
      '!**/node_modules/**',
      '!**/jest.config.js',
    ],
    coverageDirectory: 'coverage',
    verbose: true,
    transform: {},
    // extensionsToTreatAsEsm: ['.js'],  ← Borttagen!
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
  };