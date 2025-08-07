module.exports = (app, router) => {
  const { view: viewController } = app.controller;

  //当用户访问 /view/page1 时，渲染 output/entry.page1.tpl 页面
  router.get('/view/:page', viewController.renderPage.bind(viewController));
}