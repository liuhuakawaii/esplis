/**
 * webpack 基础配置
 */
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 仅在生产环境中使用 MiniCssExtractPlugin

// 获取 app/pages 目录下所有入口文件（entry.xx.js）
const entryFiles = glob.sync(path.join(process.cwd(), './app/pages/**/entry.*.js'))
const pageEntries = {}
const htmlWebpackPluginList = []
entryFiles.forEach(item => {
  const entryName = path.basename(item, '.js')
  pageEntries[entryName] = item
  htmlWebpackPluginList.push(new HtmlWebpackPlugin({
    // 产物最终输出路径
    filename: path.resolve(process.cwd(), './app/public/dist/', `${entryName}.tpl`),
    // 指定要使用的末班文件
    template: path.resolve(process.cwd(), './app/view/entry.tpl'),
    // 指定要引入的 chunk
    chunks: [entryName],
    // 指定注入位置
    inject: 'body',
  }))
})


module.exports = {
  // 入口配置
  entry: pageEntries,
  // 模块解析配置(决定了要加载解析哪些模块，以及用什么规则解释)
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [
          // 只对业务代码进行 babel，加快 webpack 打包速度
          path.join(process.cwd(), './app/pages'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 启用缓存来加速构建过程
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 300,
          }
        },
        generator: {
          filename: 'images/[hash][ext][query]',
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        }
      }
    ],
  },
  // 产物输出路径 dev和prod输出内容不一致
  output: {},
  // 构建缓存设置（显著提升二次构建速度）
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  // 配置模块解析的具体行为（定义 webpack 在打包时，如何找到并解析具体模块的路径）
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css', '.json'],
    alias: {
      $pages: path.resolve(process.cwd(), './app/pages'),
      $common: path.resolve(process.cwd(), './app/pages/common'),
      $widgets: path.resolve(process.cwd(), './app/pages/widgets'),
      $store: path.resolve(process.cwd(), './app/pages/store'),
      $components: path.resolve(process.cwd(), './app/pages/components'),
    },
  },
  // 配置 webpack 在打包时，如何处理模块
  plugins: [
    // 处理 vue 文件，这个插件是必须的
    // 他的职责是：将你定义过的其他规则复制并应用到 .vue 文件中
    // 例如，如果你使用了
    // {
    //   test: /\.js$/,
    //   use: 'babel-loader'
    // }
    // 那么接下来，对于所有 .vue 文件，<script> 标签中的 js 代码，都会经过 babel 进行处理
    new VueLoaderPlugin(),
    // 不再通过 ProvidePlugin 注入 Vue，按需从模块中显式 import
    // 定义全局常量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // 支持 vue 解析 optionsApi
      __VUE_PROD_DEVTOOLS__: false, // 禁用 vue 调试工具
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 禁用 vue 数据不匹配的详细信息
    }),
    // CSS 抽取在生产环境配置中处理
    ...htmlWebpackPluginList,
  ],
  // 配置打包输出优化 (代码分割、模块合并、缓存、TreeShaking、压缩等优化策略)
  optimization: {
    // 将运行时代码拆分，降低业务 chunk 的哈希波动，提升缓存命中
    runtimeChunk: 'single',
    /**
     * 把 js 文件打包成三种类型
     * 1. vendor 第三方 lib 库
     * 2. common 业务组件代码的公共部分抽取出来，改动较少
     * 3. entry.{page} 不同页面 entry 里的业务组件代码的差异部分，会经常改动
     * 目的：把改动和引用频率不一样的 js 区分出来，以达到更好利用浏览器缓存的目的
     */
    splitChunks: {
      chunks: 'all',// 对同步和异步模块都进行分割
      maxAsyncRequests: 10,// 每次异步加载的最大并行请求数
      maxInitialRequests: 3,// 入口点的最大并行请求数
      minSize: 20000,// 最小分割大小
      cacheGroups: {
        vendor: {// 第三方库
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 20,// 权重
          enforce: true,// 强制执行
          reuseExistingChunk: true,// 重用已有的 chunk
        },
        common: {// 业务组件代码的公共部分
          name: 'common',
          minChunks: 2,// 最小引用次数
          minSize: 1,// 最小分割大小 (1 byte)
          priority: 10,// 权重
          reuseExistingChunk: true,// 重用已有的 chunk
        },
      }
    },
  },
}