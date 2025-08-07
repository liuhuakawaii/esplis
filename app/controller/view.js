module.exports = (app) => {
  return class ViewController {
    /**
     * 渲染页面
     * @param {Object} ctx 
     * @param {Object} next 
     */
    async renderPage(ctx, next) {
      await ctx.render(`output/entry.${ctx.params.page}`, {
        title: 'ENTRY PAGE1 xxx'
      });
    }
  }
}