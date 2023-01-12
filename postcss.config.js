const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    autoprefixer,
    purgecss({
        content: [
            '**/*.html',
            '**/*.njk',
            '**/*.liquid',
            '**/*.md'
        ],
        css: ['dist/assets/css/main.css'],
        defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:\.]/g) || []
    })
  ]
}