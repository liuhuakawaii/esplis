module.exports = (app) => {
  return class ProjectController {
    /**
     * 获取项目列表
     * @param {Object} ctx 上下文
     * @param {Object} next 
     */
    async getList(ctx, next) {
      const { project: projectService } = app.service;
      const list = await projectService.getList();
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: list,
        metadata: {}
      };
    }
  }
}