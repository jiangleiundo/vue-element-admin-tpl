/*
 * @Description: eslint
 * @Autor: J.L
 * @Date: 2021-04-11 12:05:53
 * @LastEditors: J.L
 * @LastEditTime: 2021-05-07 00:02:14
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    // 扩展一个流行的风格指南，即 eslint-config-standard
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    // 全局变量在此处加入生命，避免eslint校验
    globals: {
        BMap: true
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, {
        'x-invalid-end-tag': false
        }],
        'no-undef': 'off',
        'camelcase': 'off',
        'no-extra-boolean-cast': 2, // 禁止不必要的boolean转化
        'no-extra-parens': 2, // 禁止非必要的括号
        'id-match': 1, // 命名检查
        'quotes': 0, // 引号类型不限制
        'space-comment': 0, // 注释风格不要有空格
        'use-isnan': 2, // 禁止比较时使用NaN，只能使用isNaN()
        "indent": ["off", 2],
        "no-console": "off",
        "one-var": ['warn', 'never'], // 每个作用域允许多个声明
        "object-curly-spacing": ['warn', 'never'], // 不允许大括号内有空格
        "space-before-function-paren": 0, // 禁止函数括号前的一个空格
        "no-multi-spaces": 1, //不允许出现多余的空格
        "vue/html-self-closing": "off", // 自闭和标签
        "vue/max-attributes-per-line": "off", // 属性换行
        "vue/no-multi-spaces": "off", // 多空格
        "vue/html-quotes": "off", // 单引号双引号
        "vue/html-closing-bracket-spacing": "off",
        "vue/mustache-interpolation-spacing": "off",
        "vue/script-indent": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/attribute-hyphenation": "off", // 属性使用连字符 attr-xxx
        "vue/attributes-order": "off", // 属性排序
        "vue/require-default-prop": "off", // 默认值
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'vue/script-indent': ['off', 2, { baseIndent: 1 }]
            }
        }
    ],
    parserOptions: {
        parser: 'babel-eslint'
    }
}
