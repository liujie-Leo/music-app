/**
 * 将url和param数据进行拼接
 * @url 地址
 * @params 参数对象
*/
export const getFormatUrl = function(url:string,params:object){
  let urlStr = url + '?'
  for (let key in params) {
    const value = params[key]
    urlStr = urlStr + `${key}=${value}&`
  }
  return urlStr.substr(0, urlStr.length - 1);
}