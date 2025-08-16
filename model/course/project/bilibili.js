module.exports = {
  name: 'B站',
  desc: 'B站课程系统',
  homePage: '',
  menu: [{
    key: "course",
    name: "课程资料",
    menuType: "module",
    moduleType: "sider",
    siderConfig: {
      menu: [{
        key: "video",
        name: "视频",
        moduleType: "module",
        customConfig: {
          path: "/video",
        }
      }, {
        key: "pdf",
        name: "PDF",
        moduleType: "module",
        customConfig: {
          path: "/pdf",
        }
      }, {
        key: "excel",
        name: "Excel",
        moduleType: "module",
        customConfig: {
          path: "/excel",
        }
      }, {
        key: "ppt",
        name: "PPT",
        moduleType: "module",
        customConfig: {
          path: "/ppt",
        }
      }]
    }
  }]
}