import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git', 'dist', 'mock', '.umi']
  },
  attributify: {
    // 只有vite生效
    prefix: 'w:'
  },
  darkMode: 'class',
  shortcuts: {
    btn: 'mr-10px text-primary cursor-pointer hover:text-primary-hover active:text-primary-active'
  },
  theme: {
    colors: {
      primary: {
        hover: '#40a9ff',
        DEFAULT: '#1890ff',
        active: '#096dd9',
        outline: 'rgba(24, 144, 255, .2)',
        1: '#e6f7ff',
        2: '#bae7ff',
        3: '#91d5ff',
        4: '#69c0ff',
        5: '#40a9ff',
        6: '#1890ff',
        7: '#096dd9'
      },
      success: {
        hover: '#73d13d',
        DEFAULT: '#52c41a',
        active: '#389e0d',
        outline: 'rgba(82, 196, 26, .2)'
      },
      warning: {
        hover: '#ffc53d',
        DEFAULT: '#faad14',
        active: '#d48806',
        outline: 'rgba(250, 173, 20, .2)'
      },
      error: {
        hover: '#ff7875',
        DEFAULT: '#ff4d4f',
        active: '#f5222d',
        outline: 'rgba(255, 77, 79, .2)'
      },
      // 链接色
      link: '#1890ff',
      // 标题色
      heading: 'rgba(0, 0, 0, 0.85)',
      // 主文本色
      text: 'rgba(0, 0, 0, 0.65)',
      // 次文本色
      'text-secondary': 'rgba(0, 0, 0, 0.45)',
      // 失效色
      disabled: 'rgba(0, 0, 0, 0.25)',
      // 边框色
      border: '#d9d9d9',
      'pink-deep': '#ff1493'
    },
    extend: {
      borderRadius: {
        // 组件/浮层圆角
        base: '2px'
      },
      boxShadow: {
        // 浮层阴影
        base: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
      },
      // 文字大小用text-sm, 即14px
      fontSize: {},
      lineHeight: {
        antd: 1.5715,
        unset: 'unset',
        inherit: 'inherit'
      }
    }
  }
})
