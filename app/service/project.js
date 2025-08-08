module.exports = (app) => {
  const BaseService = require('./base')(app);
  return class ProjectService extends BaseService {
    async getList() {
      return [
        {
          id: 1,
          name: '项目1',
          description: '项目1描述'
        },
        {
          id: 2,
          name: '项目2',
          description: '项目2描述'
        }
      ];
    }

    async getList2() {
      return [
        {
          id: 1,
          name: '项目1',
          description: '项目12222描述'
        },
        {
          id: 2,
          name: '项目2',
          description: '项目2描述'
        }
      ];
    }
  }
}