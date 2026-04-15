import { MessagePlugin } from 'tdesign-react'

export function typeOf(obj: any) {
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
  return map[Object.prototype.toString.call(obj)]
}

export function validateFields(
  form: Record<any, any>,
  messages: Record<any, any>
) {
  for (const [k, v] of Object.entries(form)) {
    if (!v) {
      messages[k] && MessagePlugin.error(messages[k])
      return
    }
  }
  return true
}
