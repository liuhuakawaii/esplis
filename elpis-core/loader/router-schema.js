const path = require('path');
const glob = require('glob');


/**
 * router-schema loader
 * @param {Object} app 应用实例
 * 
 * 通过 'json-schema & ajv' 对 API 规则进行约束，配合 api-params-verify 中间件使用
 * 
 * 例如：
 * app/router-schema/**.js
 * 
 * 输出：
 * app.routerSchema = {
 *  '${api1}': ${jsonSchema1},
 *  '${api2}': ${jsonSchema2},
 *  ...
 * }
 * 
 */
module.exports = (app) => {
  const routerSchemaPath = path.resolve(app.businessPath, `router-schema`);
  const fileList = glob.sync(path.join(routerSchemaPath, '**/*.{js,ts}'));
  let routerSchema = {};
  fileList.forEach(file => {
    const exportedModule = require(file);
    if (exportedModule && typeof exportedModule === 'object') {
      routerSchema = {
        ...routerSchema,
        ...exportedModule,
      };
    }
  });
  app.routerSchema = routerSchema;
}