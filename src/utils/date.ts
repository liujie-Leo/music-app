import moment from 'moment'

/** 
 * 获取指定格式的时间  时区为当前系统时区
 * @time  时间类 或者标准格式的string
 * @format "YYYY-MM-DD'T'HH:mm:ss.SSSZZ"
*/
export function getTimeFormFormat(time:any, format?:string):string {
  let date;
  if (time === undefined || time == null) {
    date = moment();
  } else {
    date = moment(time);
  }
  const str = date.format(format);
  return str;
}

/** 
 * 将秒转化为分钟
 * @second  秒
*/
export function secondsToMinuts(second:number):string {
  const time = moment.duration(second, "seconds"); 
  const minutes = time.minutes();
  const seconds = time.seconds();
  return moment({ m:minutes, s:seconds }).format('mm:ss');
}