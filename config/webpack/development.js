const configFactory = require('./lib-development')
const path = require('path')
const webpackMerge = require('webpack-merge')

const defaultConfig = require('./default');

const standardConfig = configFactory({
  context: path.resolve(__dirname, '../..'),
  entry: './src',
  library: 'navigation-component'
})

module.exports = webpackMerge.smart(standardConfig, defaultConfig)
