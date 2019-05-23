const common = require('./webpack.config.common')

delete common.resolve.alias.react
delete common.externals

module.exports = common
