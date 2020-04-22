// vue.config.js
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production'
        ? '/arithmetic/'
        : '/'
}