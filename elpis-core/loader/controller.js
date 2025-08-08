const path = require('path');
const { globSync } = require('glob');
const { sep } = path;

/**
 * controller loader
 * @param {Object} app 应用实例
 * 
 * 加载所有 controller, 可通过 'app.controller.${目录}.${文件名}' 获取
 * 
 * 例如：
 * app/controller/
 * └──custom-module/
 *     └──custom-controller.js
 * 
 * => app.controller.customModule.customController
 */
module.exports = (app) => {
  const controllerPath = path.resolve(app.businessPath, `controller`);
  const fileList = globSync(path.join(controllerPath, '**/*.{js,ts}'));

  const controllers = {};
  fileList.forEach(file => {
    const relative = path.relative(controllerPath, file); // => custom-module/custom-controller
    let name = relative.replace(/\.js$/, '');
    name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

    //构建多层级对象路径 app.controller.xxx.xxx
    let tempController = controllers
    const names = name.split(sep)  // [a,b,c,d]
    for (let i = 0, len = names.length; i < len; i++) {
      const key = names[i];
      if (i === len - 1) {
        const ControllerModule = require(file)(app);
        tempController[key] = new ControllerModule();
      } else {
        tempController[key] ??= {};
        tempController = tempController[key];
      }
    }
  });
  app.controller = controllers;
}