module.exports = {
    root: true,
    extends: ["next/core-web-vitals", "eslint:recommended"],
    rules: {
        // Règles de variables
        "no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: true,
                // varsIgnorePattern: "^_",
                // argsIgnorePattern: "^_",
            },
        ],
        "no-undef": "error",
        "no-use-before-define": [
            "error",
            {
                functions: true,
                classes: true,
                variables: true,
            },
        ],
        "no-shadow": [
            "error",
            {
                builtinGlobals: true,
                hoist: "all",
                allow: ["resolve", "reject", "done", "next", "err", "error"],
            },
        ],
        "no-redeclare": ["error", { builtinGlobals: true }],

        // Règles React
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "off",

        // Règles de style et bonnes pratiques
        "no-var": "error",
        "prefer-const": [
            "error",
            {
                destructuring: "any",
                ignoreReadBeforeAssign: false,
            },
        ],
        "no-const-assign": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-unreachable": "error",
        "no-unsafe-negation": "error",
        "valid-typeof": "error",
        "no-console": [
            "warn",
            {
                allow: ["warn", "error"],
            },
        ],
        "no-debugger": "warn",
        "no-alert": "warn",
        eqeqeq: ["error", "always"],
        "no-multiple-empty-lines": [
            "error",
            {
                max: 1,
                maxEOF: 0,
            },
        ],
        "no-trailing-spaces": "error",
        "eol-last": "error",
        "semi": ["error", "always", { "omitLastInOneLineBlock": false }],
        "quotes": [
            "error",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
    },
    env: {
        browser: true,
        node: true,
        es2022: true,
    },
    globals: {
        React: "writable",
    },
};
