module.exports = {
  automock: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  coverageDirectory: "coverage",
  errorOnDeprecated: true,
  notify: true,
  notifyMode: "failure-change",
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  timers: "real",
  verbose: true
};
