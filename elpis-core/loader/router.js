const KoaRouter = require('koa-router');
const path = require('path');
const { globSync } = require('glob');

/**
 * router loader
 * @param {Object} app 应用实例
 * 
 * 解析所有 app/router/ 目录下的 router, 加载到 KoaRouter 中
 * 
 */
module.exports = (app) => {
  // 找到路由文件路径
  const routerPath = path.resolve(app.businessPath, `router`);

  // 实例化 KoaRouter
  const router = new KoaRouter();

  // 注册所有路由
  const fileList = globSync(path.join(routerPath, '**/*.{js,ts}'));
  fileList.forEach(file => {
    const routerModule = require(file);
    routerModule(app, router);
  });

  // 路由兜底
  router.get('*', async (ctx, next) => {
    ctx.status = 302; // 临时重定向
    ctx.redirect(`${app?.options?.homePage ?? '/'}`)
  });

  // 路由注册到 app 中
  app.use(router.routes());
  app.use(router.allowedMethods());
}