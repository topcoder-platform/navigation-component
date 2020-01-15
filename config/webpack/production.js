const webpackMerge = require('webpack-merge') // eslint-disable-line import/no-extraneous-dependencies

const configFactory = require('./lib-production')
const path = require('path')
const defaultConfig = require('./default')

const standardConfig = configFactory({
  context: path.resolve(__dirname, '../..'),
  entry: './src',
  library: 'navigation-component'
})

module.exports = webpackMerge.smart(standardConfig, defaultConfig)
