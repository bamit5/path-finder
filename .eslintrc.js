module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    //'react-app',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ['unused-imports'],
  rules: {
    'react/prop-types': 'off',
    "max-len": ["error", 80, 4, {"ignoreComments": true, "ignoreUrls": true,
    "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\("}],
    "sort-imports": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    "no-param-reassign": 0,
    "no-continue": 0,
    "react/jsx-one-expression-per-line": 0,
  },
};