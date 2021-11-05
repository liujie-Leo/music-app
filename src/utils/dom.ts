import Taro from '@tarojs/taro'

// 获取DOM位置
export const getDomClientRect = function (elements,options:object) {
  const query = Taro.createSelectorQuery();
  if (typeof elements === 'string') {
    // 查找单个DOM
    query.select(elements).fields(options);
  } else if (typeof elements === 'object') {
    // 查找多个DOM
    for (const key of elements) {
      query.select(key).fields(options);
    }
  }
  return new Promise((resolve) => {
    query.exec(res => {
      resolve(res)
    })
  })
}