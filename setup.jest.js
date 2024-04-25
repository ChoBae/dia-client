// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
// setup.jest.ts
const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextDecoder, TextEncoder });
