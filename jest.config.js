module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
        "\\.(svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!react-icons)"
      ]


}