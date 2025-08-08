const path = require('path');
const { globSync } = require('glob');
const { sep } = path;

/**
 * service loader
 * @param {Object} app 应用实例
 * 
 * 加载所有 service, 可通过 'app.service.${目录}.${文件名}' 获取
 * 
 * 例如：
 * app/service/
 * └──custom-module/
 *     └──custom-service.js
 * 
 * => app.service.customModule.customService
 */
module.exports = (app) => {
  const servicePath = path.resolve(app.businessPath, `service`);
  const fileList = globSync(path.join(servicePath, '**/*.{js,ts}'));

  const service = {};
  fileList.forEach(file => {
    const relative = path.relative(servicePath, file); // => custom-module/custom-service
    let name = relative.replace(/\.js$/, '');
    name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());

    //构建多层级对象路径 app.controller.xxx.xxx
    let tempService = service
    const names = name.split(sep)
    for (let i = 0, len = names.length; i < len; i++) {
      const key = names[i];
      if (i === len - 1) {
        const ServiceModule = require(file)(app);
        tempService[key] = new ServiceModule();
      } else {
        tempService[key] ??= {};
        tempService = tempService[key];
      }
    }
  });
  app.service = service;
}