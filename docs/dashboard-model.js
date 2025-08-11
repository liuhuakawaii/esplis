export const dashboardModel = {
  mode: 'dashboard', //模板类型，不同模板类型对应不一样的模板数据结构
  name: '', // 名称
  desc: '', // 描述
  homePage: '', // 首页(项目配置)
  // 头部菜单
  menu: [{
    key: '',//菜单唯一标识
    name: '',//菜单名称
    menuType: '',//枚举值：group / module
    // 当 menuType 为 group 时，可填
    subMenu: [{
      // 可递归 menuItem
    }],
    moduleType: '', //枚举值：sider / iframe / custom / schema
    // 当 moduleType 为 sider 时，可填
    siderConfig: {
      menu: [{
        // 可递归 menuItem (除 moduleType 为 sider 外)
      }]
    },
    // 当 moduleType 为 iframe 时，可填
    iframeConfig: {
      path: '',
    },
    // 当 moduleType 为 custom 时，可填
    customConfig: {
      path: '',
    },
    // 当 moduleType 为 schema 时，可填
    schemaConfig: {
      api: '',// 数据源API [遵循 RESTFUL 规范]
      schema: {
        type: 'object',
        properties: {
          key: {
            ...schema, // 标准 schema 配置
            type: '', // 字段类型
            label: '', // 字段的中文名
          }
        }
      },
      tableConfig: {}, // table 相关配置
      searchConfig: {}, // search-bar 相关配置
      components: {}, // 模块组件
    },
  }]
}