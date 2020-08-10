# ESLint + Prettier Setup for TypeScript in VS Code

* Close `format on save` in VS Code
* Initialize the following 3 files in the root directory of your project:
  * .eslintrc
  * .prettierrc
  * settings.json

```js
// .eslintrc
{
    "extends": [
        "react-app",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018, // Allows for the parsing of modern ECMAScript features
        "sourceType": "module", // Allows for the use of imports
        "ecmaFeatures": {
            "jsx": true // Allows for the parsing of JSX
        }
    },
    "plugins": ["react-hooks", "@typescript-eslint", "prettier"],
    "globals": {
        "context": "readonly",
        "cy": "readonly",
        "assert": "readonly",
        "Cypress": "readonly"
    },
    "rules": {
        "prettier/prettier": [
            "warn",
            {
                "singleQuote": true,
                "semi": false
            }
        ],
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-console": "warn",
        "jsx-a11y/href-no-hash": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/ban-ts-ignore": "off"
    },
    "settings": {
        "react": {
            "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
}
```

```js
// .prettierrc
{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 120,
    "tabWidth": 4						// this property sets indentation to 4, otherwise it may be 2.
}
```

```json
// settings.json
{
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        { "language": "typescript", "autoFix": true },
        { "language": "typescriptreact", "autoFix": true }
    ],
    "editor.formatOnSave": true,
    "[javascript]": {
        "editor.formatOnSave": false
    },
    "[javascriptreact]": {
        "editor.formatOnSave": false
    },
    "[typescript]": {
        "editor.formatOnSave": false
    },
    "[typescriptreact]": {
        "editor.formatOnSave": false
    }
}
```





## Reference

https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb