const path = require('path');
const glob = require('glob');

/**
 * extend loader
 * @param {Object} app 应用实例
 * 
 * 加载所有 extend, 可通过 'app.extend.${文件名}' 获取
 * 
 * 例如：
 * app/extend/
 *     └──custom-extend.js
 * 
 * => app.extend.customExtend
 */
module.exports = (app) => {
  const extendPath = path.resolve(app.businessPath, `extend`);
  const fileList = glob.sync(path.join(extendPath, '**/*.{js,ts}'));

  const extend = {};
  fileList.forEach(file => {
    const relative = path.relative(extendPath, file); // => custom-extend
    let name = relative.replace(/\.js$/, '');
    name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase());
    // 过滤 app 已经存在的 key 
    for (const key in app) {
      if (key === name) {
        console.warn(`[exception] extend ${name} already exists`);
        return;
      }
    }
    extend[name] = require(file)(app);
  });
  app.extend = extend;
}