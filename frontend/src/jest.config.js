// jest.config.js

module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  // No need to map react-router-dom unless you're mocking it
};
