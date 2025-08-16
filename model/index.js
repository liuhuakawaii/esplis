const { globSync } = require('glob');
const path = require('path');

/**
 * 解析 model 配置，并返回组织且继承后的数据结构
 * [{
 *  model: ${model},
 *  project:{
 *   proj1: ${proj1},
 *   proj2: ${proj2},
 *   ...
 *  }
 * }]
 */
module.exports = (app) => {
  const modelList = []

  //遍历当前文件夹，构造模型数据结构，挂载到 modelList 上
  const modelPath = path.resolve(app.baseDir, 'model');
  const fileList = globSync('**/*.js', {
    cwd: modelPath,
    absolute: true,
    windowsPathsNoEscape: true,
  });
  fileList.forEach(file => {
    if (file.indexOf('index.js') > -1) {
      return
    }

    // 区分 model 和 project
    const type = file.indexOf('project') > -1 ? 'project' : 'model'
    if (type === 'model') {
      const modelKey = file.match(/\/model\/(.*)\/model\.js/)[1]
      let modelItem = modelList.find(item => item.model?.key === modelKey)
      if (!modelItem) {
        modelItem = {}
        modelList.push(modelItem)
      }
      modelItem.model = require(file)
      modelItem.model.key = modelKey
    }
    if (type === 'project') {
      // const modelKey 
    }

  });
  return modelList;
}