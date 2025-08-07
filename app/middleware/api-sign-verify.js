const md5 = require('md5');
/**
 * API 签名合法性校验
 * @param {object} app koa 实例
 */
module.exports = (app) => {
  return async (ctx, next) => {
    // 只对 API 请求进行签名合法性校验
    if (ctx.path.indexOf('/api/') < 0) {
      return await next();
    }

    const { path, method } = ctx
    const { headers } = ctx.request
    const { s_sign: sSgin, s_t: st } = headers

    const signKey = 'dbaskb45s3afaf8v2a0asd1a';
    const signature = md5(`${signKey}_${st}`)
    app.logger.info(`[-- api sign verify --]: ${path} ${method} signature: ${signature}`)
    if (!sSgin || !st || sSgin.toLowerCase() !== signature.toLowerCase() || Date.now() - st > 1000 * 60 * 5) {
      ctx.status = 200
      ctx.body = {
        success: false,
        code: 445,
        message: 'signature not correct or api timeout!',
      }
      return
    }

    await next();
  }
}