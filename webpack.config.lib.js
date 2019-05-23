const common = require('./webpack.config.common')

module.exports = Object.assign({}, common, {
  output: {
    library: 'TcNavReact',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})
