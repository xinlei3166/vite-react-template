// 带http[s]前缀的标准url正则
export const urlPattern =
  /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/

// 手机号正则
export const phonePattern = /^1[123456789]\d(\*{4}|\d{4})\d{4}$/

// 邮箱正则
export const emailPattern =
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
