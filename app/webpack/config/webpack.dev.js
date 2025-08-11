const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

/**
 *  style-loader:将 CSS 通过 JavaScript 动态插入到 <style> 标签中。
 *  用于开发环境：
 *   + 配合 Webpack 的 HMR（热模块替换）功能，能让 CSS 修改实时生效。
 *   + 不需要写入实际 CSS 文件到磁盘。
 * 
 * MiniCssExtractPlugin.loader
 * 用于生产环境：
 *  + 生成单独 .css 文件，浏览器可缓存，提升加载速度
 *  + 支持 <link> 标签加载，避免样式打包进 JS，减少 JS 体积
 */
// 加载开发期样式所需的 loader
const styleLoader = 'style-loader'
const cssLoader = {
  loader: 'css-loader',
  options: { sourceMap: true, importLoaders: 1 },
}
const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    lessOptions: { javascriptEnabled: true },
  },
}

const DEV_SERVER_CONFIG = {
  HOST: '127.0.0.1',
  PORT: 9002,
  HMR_PATH: '__webpack_hmr',
  TIMEOUT: 20000,
}

Object.keys(baseConfig.entry).forEach(v => {
  //第三方包不作为hmr入口
  if (v !== 'vendor') {
    baseConfig.entry[v] = [
      // hmr 热更新入口
      `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/${DEV_SERVER_CONFIG.HMR_PATH}&timeout=${DEV_SERVER_CONFIG.TIMEOUT}`,
      baseConfig.entry[v]
    ]
  }
})

// 开发环境配置
const webpackConfig = merge(baseConfig, {
  mode: 'development',
  // source-map 追踪错误
  devtool: 'eval-cheap-module-source-map',
  output: {
    // HMR 下 hash 没意义，且生成大量不同名文件（缓存失效、落盘多、diff 不友好）
    filename: 'js/[name].js',
    path: path.join(process.cwd(), './app/public/dist/dev/'), //输出文件存储路径
    publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev/`, // 外部资源公共路径
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [styleLoader, cssLoader],
      },
      {
        test: /\.less$/,
        use: [styleLoader, cssLoader, lessLoader],
      },
    ],
  },
  plugins: [
    // 模块热更新插件
    new webpack.HotModuleReplacementPlugin({
      multiStep: false,
    }),
  ]
})

module.exports = {
  // webpack 配置
  webpackConfig,
  // webpack-dev-server 配置,暴露给 dev.js 使用
  DEV_SERVER_CONFIG
}