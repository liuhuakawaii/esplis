const Koa = require('koa');
const path = require('path');
const { sep } = path;  // 用于兼容不同操作系统上的斜杠

const env = require('./env');

const middlewareLoader = require('./loader/middleware');
const routerSchemaLoader = require('./loader/router-schema');
const routerLoader = require('./loader/router');
const controllerLoader = require('./loader/controller');
const serviceLoader = require('./loader/service');
const configLoader = require('./loader/config');
const extendLoader = require('./loader/extend');

/**
 * 启动项目
 * @param {Object} options 项目配置
 * options = {
 *  name // 项目名称
 *  homePage // 首页
 * }
 */
module.exports = {
  start(options = {}) {
    // 创建koa实例
    const app = new Koa();

    // 应用配置
    app.options = options;

    // 基础路径
    app.baseDir = process.cwd();

    // 业务文件路径
    app.businessPath = path.resolve(app.baseDir, `.${sep}app`);
    // 初始化环境配置
    app.env = env();
    console.log(`-- [start] env: ${app.env.get()} --`);

    //加载 middleware
    middlewareLoader(app);
    console.log(`-- [start] middlewareLoader --`);

    //加载 routerSchema
    routerSchemaLoader(app);
    console.log(`-- [start] routerSchemaLoader --`);

    //加载 controller
    controllerLoader(app);
    console.log(`-- [start] controllerLoader --`);

    //加载 service
    serviceLoader(app);
    console.log(`-- [start] serviceLoader --`);

    //加载 config
    configLoader(app);
    console.log(`-- [start] configLoader --`);

    //加载 extend
    extendLoader(app);
    console.log(`-- [start] extendLoader --`);

    // 注册全局中间件
    try {
      require(`${app.businessPath}${sep}middleware.js`)(app);
      console.log(`-- [start] load globalMiddleware done --`);
    } catch (error) {
      console.error(`[exception] global middleware error: ${error.message}`);
    }

    //加载 router 需要放在最后：因为需要先加载完其他模块，才能正确加载路由
    routerLoader(app);
    console.log(`-- [start] routerLoader --`);
    // 启动服务
    try {
      const port = process.env.PORT || 8080;
      const host = process.env.IP || '0.0.0.0';
      app.listen(port, host)
      console.log(`Server is running on http://${host}:${port}`);
    } catch (error) {
      console.error(error);
    }
  }
}
