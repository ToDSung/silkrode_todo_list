module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{vue,js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{vue,js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom', // 浏览器环境项目，需要设置此选项
  transform: {
    '^.+\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: [
    'vue',
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
};