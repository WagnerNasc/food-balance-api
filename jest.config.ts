/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
}

export default config
