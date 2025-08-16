module.exports = {
  name: '淘宝',
  desc: '淘宝电商系统',
  homePage: '',
  menu: [{
    key: "product",
    name: "商品管理",
    moduleType: "iframe",
    iframeConfig: {
      path: "http://www.baidu.com",
    }
  }, {
    key: "operating",
    name: "运营活动",
    menuType: "module",
    moduleType: "sider",
    siderConfig: {
      menu: [{
        key: "coupon",
        name: "优惠券管理",
        moduleType: "module",
        customConfig: {
          path: "/coupon",
        }
      }, {
        key: 'limited',
        name: '限时抢购',
        moduleType: 'module',
        customConfig: {
          path: '/limited'
        }
      }, {
        key: "festival",
        name: '节日活动',
        moduleType: 'module',
        customConfig: {
          path: '/festival'
        }
      }]
    },
  }]
}