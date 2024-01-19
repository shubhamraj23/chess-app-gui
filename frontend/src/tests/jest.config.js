module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
  transformIgnorePatterns: ['node_modules/(?!axios)']
}