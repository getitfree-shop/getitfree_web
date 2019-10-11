// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    "parser": 'typescript-eslint-parser',
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions": true,
            "classes": true,
            "modules": true,
            "defaultParams": true
        },
    },
    env: {
        browser: true,
    },
    extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
    plugins: [
        "class-property"
    ],
    "rules": {
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "ObjectExpression": "first"
        }],
        "eqeqeq": 1,
        "no-useless-escape": 0,
        "brace-style": 0,//大括号风格
        "curly": [2, "all"], //[2, "all"],//必须使用 if(){} 中的{}
        "no-new": 0,
        "no-return-assign": 0,//return 语句中不能有赋值表达式
        "handle-callback-err": 0,
        "padded-blocks": 0,
        "no-duplicate-imports": 0,
        "operator-linebreak": 0,
        "no-extend-native": 0,
        "no-sequences": 0,
        "no-debugger": 0,
        "no-eval": 0,
        "comma-dangle": [2, "never"],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "no-undef": 2,
        "no-unused-vars": 1,
        "no-console": 0,
        "space-before-function-paren": [0, "always"],
        "keyword-spacing": [2, { "before": true, "after": true }],
        "space-before-blocks": [2, "always"],
        "spaced-comment": [2, "always", {"exceptions": ['-', '+']}],
        "quotes": [2, "double"],
        "semi": [2, "never"],
        "no-multiple-empty-lines": [2, {"max": 1}],
        "generator-star-spacing": [2, { "before": true, "after": true }],
        "object-curly-newline": ["error", { "consistent": true, "minProperties": 2 }],
        "object-curly-spacing": [2, "always"],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "linebreak-style": [0, "windows"],
        "eol-last": [2, "windows"],
        "object-property-newline": [2, {}],
        "space-infix-ops": 2,
        "no-control-regex": 0,
        "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".tsx"] }],
        "react/jsx-closing-tag-location": 2,
        "react/self-closing-comp": ["error", {
            "component": true,
            "html": true
        }],
        "react/jsx-tag-spacing": ["error", {
            "closingSlash": "never",
            "beforeSelfClosing": "always",
            "afterOpening": "never",
            "beforeClosing": "never"
        }],
        "react/no-render-return-value": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/anchor-has-content": 0,
        "react-hooks/exhaustive-deps": 0,
        "react-hooks/rules-of-hooks": 0,
        "space-before-function-paren": [2, 'always'],
        "react/jsx-first-prop-new-line": [2, "multiline-multiprop"],
        "react/jsx-max-props-per-line": [2, { "maximum": 1, "when": "multiline" }],
        "no-empty": 0,
        "react/react-in-jsx-scope": 0
    },
    globals: {
        React: true,
        ReactDOM: true
    }
}
