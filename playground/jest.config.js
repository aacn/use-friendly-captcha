module.exports = {
    "roots": ["<rootDir>/src/__tests__"],
    "transform": {
        "\\.[jt]sx?$": "babel-jest"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
        "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "moduleDirectories": ["node_modules", "<rootDir>/src"],
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["@testing-library/jest-dom"]
}
