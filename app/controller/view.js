module.exports = (app) => {
  return class ViewController {
    /**
     * 渲染页面
     * @param {Object} ctx 
     * @param {Object} next 
     */
    async renderPage(ctx, next) {
      await ctx.render(`dist/entry.${ctx.params.page}`, {
        title: 'ENTRY PAGE1 xxx',
        name: app.options?.name,
        env: app.env.get(),
        options: JSON.stringify(app.options),
      });
    }
  }
}