const path = require('path');
/**
 * config loader
 * @param {Object} app 应用实例
 * 
 * 配置区分 本地/测试/生产，通过 env 环境读取不同文件配置 env.config
 * 通过 env.config 覆盖 default.config 加载到 app.config 中
 * 
 * 目录下对应的 config 配置
 * 默认配置 config/config.default.js
 * 本地配置 config/config.local.js
 * 测试配置 config/config.beta.js
 * 生产配置 config/config.production.js
 * 
 */
module.exports = (app) => {
  // 找到 config/ 目录
  const configPath = path.resolve(app.baseDir, `config`);
  // 获取 default.config
  let defaultConfig = {}
  try {
    defaultConfig = require(path.resolve(configPath, `config.default.js`));
  } catch (error) {
    console.error(`[exception] default.config not found: ${error.message}`);
  }
  // 获取 env.config
  let envConfig = {}
  try {
    const env = app.env.get();
    envConfig = require(path.resolve(configPath, `config.${env}.js`));
  } catch (error) {
    console.error(`[exception] env.config not found: ${error.message}`);
  }
  // 覆盖并加载 config 配置
  app.config = Object.assign({}, defaultConfig, envConfig);
  console.log(app.config, '-cofig-')
}