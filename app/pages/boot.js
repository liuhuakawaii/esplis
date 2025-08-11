import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import '$styles/global.css'
import pinia from '$store'

import { createRouter, createWebHashHistory } from 'vue-router'


/**
 * vue 页面主入口， 用于启动 vue
 * @param {Object} pageComponent Vue 入口组件
 * @param {Array} routes 路由配置
 * @param {Array} libs 对应页面需要引入的库
 */

export default (pageComponent, { routes, libs } = {}) => {
  const app = createApp(pageComponent)
  app.use(ElementPlus)
  app.use(pinia)
  if (libs && libs.length) {
    for (let i = 0; i < libs.length; i++) {
      app.use(libs[i])
    }
  }
  if (routes && routes.length) {
    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
    app.use(router)
    router.isReady().then(() => {
      app.mount('#root')
    })
  } else {
    app.mount('#root')
  }
}

/**
 * SSR = Server Side Render 服务端渲染
 * CSR = Client Side Render 客户端(浏览器)渲染
 * 首屏 /view/page1  /view/page2
 * 次屏 /view/page1/view1  /view/page1/view2 ....
 * 这样结合起来， 首屏加载速度快， SEO友好
 */