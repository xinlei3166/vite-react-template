import { formatDatetime, unifiedTimeStamp } from './datetime'
import qs from 'qs'

/**
 * 获取url 参数的方法
 * @param {*} item 为参数的键
 */
export const getUrlData = function (item: string) {
  const search = window.location.href.split('?')[1]
  return (qs.parse(search)[item] || '') as string
}

/**
 * 由生日计算年龄  精确到月份
 * @param {*} birthday: yyyy-MM-dd格式字符串或者时间戳
 * @param {*} sMonth: 是否显示月份
 */
export const getAge = (birthday: number | string, sMonth = true): string => {
  let _birthday
  if (Object.prototype.toString.call(birthday) === '[object Number]') {
    _birthday = unifiedTimeStamp(birthday, 'YYYY-MM-DD')
  } else if (Object.prototype.toString.call(birthday) === '[object String]') {
    const b = birthday as string
    // eslint-disable-next-line prefer-destructuring
    _birthday = b.split(' ')[0]
  }
  if (!_birthday) return ''
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
  const birthdayArr = _birthday.match(reg)
  const today = formatDatetime(new Date(), 'YYYY-MM-DD')
  const todayArr = today.match(reg)
  const T1 = (todayArr && Number(todayArr[1])) || 0
  const B1 = (birthdayArr && Number(birthdayArr[1])) || 0
  const T3 = (todayArr && Number(todayArr[3])) || 0
  const B3 = (birthdayArr && Number(birthdayArr[3])) || 0
  const T4 = (todayArr && Number(todayArr[4])) || 0
  const B4 = (birthdayArr && Number(birthdayArr[4])) || 0
  let days = 0
  let month = 0
  let year = 0
  days = T4 - B4
  if (days < 0) {
    month = -1
  }
  month += T3 - B3
  if (month < 0) {
    year = -1
    month = 12 + month
  }
  year += T1 - B1
  const yearStr = year > 0 ? year + '岁' : ''
  const mnthStr = month > 0 ? month + '个月' : ''
  return sMonth ? `${yearStr} ${mnthStr}` : `${yearStr}`
}

export const isMobile = () => {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
}

// 秒数转为小时数
export function convertSecondToHour(second: number) {
  return Math.floor(second / 3600)
}

// 秒数转为分钟数
export function convertSecondToMinute(second: number) {
  return Math.floor(second / 60)
}

// 秒数转为时分秒
export function convertSecondToHMS(second: number, ignoreZero = true) {
  if (!second && ignoreZero) return ''
  let hour: string | number = Math.floor(second / 3600)
  hour = hour < 10 ? '0' + hour : hour
  let minute: string | number = Math.floor((second % 3600) / 60)
  minute = minute < 10 ? '0' + minute : minute
  let _second: string | number = Math.floor(second % 60)
  _second = _second < 10 ? '0' + _second : _second
  return [hour, minute, _second].filter(x => x !== null).join(':')
}

// 2个数字的百分比
export function calculatePercentage(
  num1: number,
  num2: number,
  showRatio?: boolean
) {
  if (num1 === null || num2 === null) return ''
  let num3: number
  if (num1 > num2) {
    num3 = num2 / num1 || 0
    return showRatio
      ? `${num2}/${num1}(${(num3 * 100).toFixed(2) + '%'})`
      : (num3 * 100).toFixed(2) + '%'
  }
  num3 = num1 / num2 || 0
  return showRatio
    ? `${num1}/${num2}(${(num3 * 100).toFixed(2) + '%'})`
    : (num3 * 100).toFixed(2) + '%'
}

// 对象数组转为对象
export function convertArrayToObject(
  arr: Record<any, any>[],
  options = { labelKey: 'value', valueKey: 'key' }
) {
  const obj: Record<any, any> = {}
  for (const item of arr) {
    obj[item[options.valueKey]] = item[options.labelKey]
  }
  return obj
}
