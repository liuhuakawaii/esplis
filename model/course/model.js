module.exports = {
  model: 'dashboard',
  name: '课程系统',
  menu: [{
    key: "course",
    name: "课程管理",
    menuType: "module",
    moduleType: "custom",
    customConfig: {
      path: "/course",
    }
  }, {
    key: "class",
    name: "班级管理",
    menuType: "module",
    moduleType: "custom",
    customConfig: {
      path: "/class",
    }
  }, {
    key: "student",
    name: "学生管理",
    menuType: "module",
    moduleType: "custom",
    customConfig: {
      path: "/student",
    }
  }]
};