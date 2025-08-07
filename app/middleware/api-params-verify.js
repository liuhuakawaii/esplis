const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * API 参数合法性校验
 * @param {object} app koa 实例
 */
module.exports = (app) => {
  return async (ctx, next) => {
    // 只对 API 请求进行签名合法性校验
    if (ctx.path.indexOf('/api/') < 0) {
      return await next();
    }

    // 获取请求参数
    const { body, query, headers } = ctx.request
    const { params, path, method } = ctx
    app.logger.info(`[-- api params verify --]: ${path} ${method} body: ${JSON.stringify(body)}`)
    app.logger.info(`[-- api params verify --]: ${path} ${method} query: ${JSON.stringify(query)}`)
    app.logger.info(`[-- api params verify --]: ${path} ${method} params: ${JSON.stringify(params)}`)
    app.logger.info(`[-- api params verify --]: ${path} ${method} headers: ${JSON.stringify(headers)}`)

    const schema = app.routerSchema[path]?.[method.toLowerCase()]
    if (!schema) {
      return await next();
    }

    let valid = true

    //ajv 校验器
    let validate;
    if (valid && headers && schema.headers) {
      schema.headers.$schema = $schema
      validate = ajv.compile(schema.headers)
      valid = validate(headers)
    }
    await next();
  }
}