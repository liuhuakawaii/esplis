// 本地启动 devServer
const express = require('express')
const consoler = require('consoler')
const path = require('path')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const {
  webpackConfig,
  DEV_SERVER_CONFIG } = require('./config/webpack.dev')

const app = express()

const compiler = webpack(webpackConfig)

// 1. 指定静态文件目录
app.use(express.static(path.join(__dirname, '../public/dist')))

// 2. 引用 divMiddleware 中间件（监控文件改动）
app.use(devMiddleware(compiler, {
  //落地文件
  writeToDisk: (filePath) => filePath.endsWith('.tpl'),
  publicPath: webpackConfig.output.publicPath,
  // headers 配置
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
  },
  // 日志输出
  stats: {
    colors: true,
  },
}))

// 3. 引用 hotMiddleware 中间件（实现热更新通讯）
app.use(hotMiddleware(compiler, {
  path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
  heartbeat: 10 * 1000,
}))

consoler.info('请等待 webpack 初次构建完成提示....')

const port = DEV_SERVER_CONFIG.PORT

app.listen(port, () => {
  // consoler.info(`dev server is running on port ${port}`)
})


