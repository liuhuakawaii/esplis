const { merge } = require('webpack-merge')
const path = require('path')

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

// 基类配置
const baseConfig = require('./webpack.base')

// 开发环境配置
const webpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    path: path.join(process.cwd(), './app/public/dist/dev'),
    publicPath: '/dist/dev/',
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
})

module.exports = webpackConfig