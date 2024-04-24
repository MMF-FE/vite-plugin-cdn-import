export default {
    singleQuote: true,
    semi: false,
    tabWidth: 4,
    printWidth: 80,
    jsxBracketSameLine: true,
    arrowParens: 'avoid',
    overrides: [
        {
            files: '**/*.scss',
            options: {
                singleQuote: false,
                semi: true,
            },
        },
    ],
}
