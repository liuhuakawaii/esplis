module.exports = (app) => {
  const BaseController = require('./base')(app);
  return class ProjectController extends BaseController {
    /**
     * 获取项目列表
     * @param {Object} ctx 上下文
     * @param {Object} next 
     */
    async getList(ctx, next) {
      const { project: projectService } = app.service;
      const list = await projectService.getList();
      this.success(ctx, list);
    }

    async getList2(ctx, next) {
      const { project: projectService } = app.service;
      const list = await projectService.getList2();
      this.success(ctx, list);
    }
  }
}