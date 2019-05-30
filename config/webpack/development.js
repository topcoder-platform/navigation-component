const configFactory = require('./lib-development')
const path = require('path')

const standardConfig = configFactory({
  context: path.resolve(__dirname, '../..'),
  entry: './src',
  library: 'navigation-component'
})

module.exports = standardConfig
