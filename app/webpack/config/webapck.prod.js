const { merge } = require('webpack-merge')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// 移除 HappyPack，使用 webpack5 默认并行和缓存能力

// 基类配置
const baseConfig = require('./webpack.base')

// 生产环境配置
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name]_[chunkhash:8].bundle.js',
    path: path.join(process.cwd(), './app/public/dist/prod'),
    publicPath: '/dist/prod/',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'less-loader',
            options: {
              // 在生产构建中开启更严格的编译
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ]
  },
  // 关闭性能提示
  performance: {
    hints: false,
  },
  plugins: [
    // 清理 output.path（webpack5 插件默认按 output.path 清理）
    new CleanWebpackPlugin(),
    // 提取 css 的公共部分，有效利用缓存，（非公共部分使用 inline）
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].bundle.css',
      chunkFilename: 'css/[name]_[contenthash:8].bundle.css',
    }),
    // new HtmlWebpackInjectAttributesPlugin({
    //   attributes: {
    //     crossorigin: 'anonymous'
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...', // ... 表示使用 webpack 内置的压缩插件
      new TerserWebpackPlugin({
        parallel: true, // 利用多核 CPU 的优势来提高构建速度
        terserOptions: {
          compress: {
            drop_console: true, // 删除 console.log 等调试代码
          },
          output: {
            comments: false, // 删除注释
          },
        },
        extractComments: false, // 删除注释
      }),
      new CssMinimizerPlugin(),
    ],
  },
})

module.exports = webpackConfig