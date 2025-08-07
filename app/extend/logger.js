const log4js = require('log4js');

/**
 * 日志工具
 * 外部调用 app.logger.info  app.logger.error  app.logger.warn  app.logger.debug  app.logger.trace
 */
module.exports = (app) => {
  let logger;
  if (app.env.isLocal()) {
    //日志输出到控制台
    logger = console;
  } else {
    //日志落盘

    log4js.configure({
      appenders: {
        console: { type: 'console' },
        //日志文件切分
        dateFile: {
          type: "dateFile",
          filename: "./logs/application.log",
          pattern: "yyyy-MM-dd",
        }
      },
      categories: {
        default: {
          appenders: ['console', 'dateFile'],
          level: 'trace'
        },
      },
    });
    logger = log4js.getLogger();
  }
  return logger;
};