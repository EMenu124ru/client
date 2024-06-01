/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {},
  globals: {},
  extends: ['prettier', 'airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ["unused-imports", "simple-import-sort", 'react-hooks'],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    // Indent with 4 spaces
    "indent": ["error", 4],
// Indent JSX with 4 spaces
    "react/jsx-indent": ["error", 4],
// Indent props with 4 spaces
    "react/jsx-indent-props": ["error", 4],
    "react/react-in-jsx-scope": "off",
    "no-param-reassign": "off",
    "prettier/prettier": "off",
    'react-hooks/rules-of-hooks': 'error',
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "max-len": [
      "error",
      120
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    // eslint-plugin-unused-imports rules
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    // TypeScript Eslint rules
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/quotes": ["error","double"],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-explicit-any": 0,

  },
  settings: {},
  overrides: [],
}
