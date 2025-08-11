const path = require('path');
const { globSync } = require('glob');
const { sep } = path;

/**
 * middleware loader
 * @param {Object} app 应用实例
 * 
 * 加载所有 middleware, 可通过 'app.middleware.${目录}.${文件名}' 获取
 * 
 * 例如：
 * app/middleware/
 * └──custom-module/
 *     └──custom-middleware.js
 * 
 * => app.middleware.customModule.customMiddleware
 */
module.exports = (app) => {
  // 读取 app/middleware/**/**.js 所有文件
  const middlewarePath = path.resolve(app.businessPath, `middleware`);
  const fileList = globSync('**/*.{js,ts}', {
    cwd: middlewarePath,
    absolute: true,
    windowsPathsNoEscape: true,
  });

  // 遍历所有文件目录，把内容加载到 app.middleware 下
  const middlewares = {};
  fileList.forEach(file => {
    //截取路径 app/middleware/custom-module/custom-middleware.js  => custom-module/custom-middleware
    //方案一：手动处理
    // let name = path.resolve(file)
    // name = name.substring(name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length, name.lastIndexOf(`.`));

    //方案二：基于系统路径分隔符（跨平台）
    const relative = path.relative(middlewarePath, file); // => custom-module/custom-middleware.js
    let name = relative.replace(/\.js$/, '');

    //把中划线或下划线后的字母转换为大写（转为驼峰）
    name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

    //构建多层级对象路径 app.middleware.xxx.xxx
    let tempMiddleware = middlewares
    const names = name.split(sep)
    for (let i = 0, len = names.length; i < len; i++) {
      const key = names[i];
      if (i === len - 1) {
        // 最后一级为模块，require 并传入 app 执行
        const mod = require(file);
        tempMiddleware[key] = typeof mod === 'function' ? mod(app) : mod;
      } else {
        // 中间路径作为对象结构存在
        tempMiddleware[key] ??= {};
        tempMiddleware = tempMiddleware[key];
      }
    }
  });
  app.middlewares = middlewares;
}