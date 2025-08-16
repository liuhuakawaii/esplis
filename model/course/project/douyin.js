module.exports = {
  name: '抖音',
  desc: '抖音课程系统',
  homePage: '',
  menu: [{
    key: "traffic",
    name: "流量管理",
    menuType: "module",
    moduleType: "sider",
    siderConfig: {
      menu: [{
        key: "traffic",
        name: "流量管理",
        moduleType: "module",
        customConfig: {
          path: "/traffic",
        }
      }]
    },
  }]
}