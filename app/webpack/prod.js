const webpack = require('webpack')
const webpackProdConfig = require('./config/webapck.prod')

console.log('\nbuilding... \n')
webpack(webpackProdConfig, (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  process.stdout.write(`${stats.toString({
    colors: true,//在控制台输出色彩信息
    modules: false,//不显示每个模块的打包信息
    children: false,//不显示子模块信息
    chunks: false,//不显示代码块信息
    chunkModules: true,//显示代码块模块信息
  })}\n`)
})