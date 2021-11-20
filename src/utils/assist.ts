import { message } from 'antd'

export function typeOf(obj: any) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  // @ts-ignore
  return map[toString.call(obj)]
}

export function validateFields(
  form: Record<any, any>,
  messages: Record<any, any>
) {
  for (const [k, v] of Object.entries(form)) {
    if (!v) {
      messages[k] && message.error(messages[k])
      return
    }
  }
  return true
}
