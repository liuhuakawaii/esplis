module.exports = (app, router) => {
  const { project: projectController } = app.controller;

  router.get('/api/project/list', projectController.getList.bind(projectController));
  router.post('/api/project/list2', projectController.getList2.bind(projectController));
}