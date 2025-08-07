module.exports = (app) => {
  return class ProjectService {
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
  }
}