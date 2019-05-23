const fs = require('fs')
const path = require('path')
const rf = require('rimraf')
const colors = require('colors/safe')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.lib')

const srcDir = path.resolve(__dirname, 'src')
const componentsDir = path.resolve(__dirname, 'src/components')

const files = fs.readdirSync(componentsDir)

const components = []

files.forEach(file => {
  const name = file.replace(path.extname(file), '')
  const config = Object.assign({}, baseConfig)
  config.entry = path.join(componentsDir, file)
  config.output.path = path.join(__dirname, name)
  config.output.filename = 'index.js'
  process.env.NODE_ENV === 'production' && rf.sync(config.output.path)
  webpack(config, handleError)
  components.push(name)
})

const config = Object.assign({}, baseConfig)
config.entry = path.join(srcDir, 'index.js')
config.output.path = __dirname
config.output.filename = 'index.js'
components.forEach(comp => {
  config.externals[`./components/${comp}`] = `./${comp}`
})
webpack(config, handleError)

function handleError (err, stats) {
  if (err) {
    console.error(colors.red(err.stack || err))
    if (err.details) {
      console.error(colors.red(err.details))
    }
  }
  const info = stats.toJson()
  if (stats.hasErrors()) {
    info.errors.forEach(err => {
      console.error(colors.red(err))
    })
  }
  if (stats.hasWarnings()) {
    info.warnings.forEach(warn => {
      console.warn(colors.orange(warn))
    })
  }
}
