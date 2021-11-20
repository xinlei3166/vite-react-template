import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)

// 时间戳格式化
export const formatDatetime = (datetime: dayjs.ConfigType, format?: string) => {
  return datetime ? dayjs(datetime).format(format || 'YYYY-MM-DD HH:mm:ss') : ''
}

// 10位或者13位时间戳格式化成字符串
export const unifiedTimeStamp = (
  datetime: dayjs.ConfigType,
  format?: string
) => {
  const str = datetime + ''
  const time = str.length === 10 ? +str * 1000 : +str
  return formatDatetime(time, format)
}

// 时间转时间戳(秒)
export const formatTimeStamp = (datetime: dayjs.ConfigType) => {
  return dayjs(datetime).unix()
}

export const getWeekday = (datetime: dayjs.ConfigType, weekdays?: []) => {
  const cnWeekdays = weekdays || [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六'
  ]
  return cnWeekdays[dayjs(datetime).weekday()]
}
