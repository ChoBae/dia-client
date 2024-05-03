const nextJest = require("next/jest");
const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFiles: ["<rootDir>/setup.jest.js"],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: "ts-jest/presets/js-with-ts",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  bail: true,
  logHeapUsage: true,
  testTimeout: 120000,
  forceExit: true,
  collectCoverage: true,

  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  // transformIgnorePatterns: ["/authLib", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^jose": require.resolve("jose"),
    "^@panva/hkdf": require.resolve("@panva/hkdf"),
    "^preact-render-to-string": require.resolve("preact-render-to-string"),
    "^preact": require.resolve("preact"),
    "^uuid": require.resolve("uuid"),
  },
};

const asyncConfig = createJestConfig(customJestConfig);

// and wrap it...
module.exports = async () => {
  const config = await asyncConfig();
  // config.transformIgnorePatterns = ["/authLib", "node_modules/(?!jose)"];
  return config;
};