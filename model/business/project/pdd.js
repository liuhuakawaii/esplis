module.exports = {
  name: '拼多多',
  desc: '拼多多电商系统',
  homePage: '',
  menu: [{
    key: "product",
    name: "商品管理(pdd)",
  }, {
    key: "client",
    name: "客户管理(pdd)",
  }, {
    key: "data",
    name: "数据分析(pdd)",
    menuType: "module",
    moduleType: "sider",
    siderConfig: {
      menu: [{
        key: "analysis",
        name: "电商罗盘(pdd)",
        moduleType: "module",
        menuType: "iframe",
        iframeConfig: {
          path: "http://www.baidu.com",
        }
      }, {
        key: 'sider-search',
        name: '搜索分析(pdd)',
        moduleType: 'iframe',
        iframeConfig: {
          path: 'http://www.baidu.com'
        }
      }]
    },
  }, {
    key: 'search',
    name: '信息查询',
    moduleType: 'iframe',
    iframeConfig: {
      path: 'http://www.baidu.com'
    }
  }]
}