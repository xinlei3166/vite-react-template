import { loadEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windicss from 'vite-plugin-windicss'
import styleImport from 'vite-plugin-style-import'
import { injectHtml } from 'vite-plugin-html'
import antdDayjs from 'antd-dayjs-vite-plugin'
import path from 'path'

// @ts-ignore
export default ({ mode }) => {
  const base =
    loadEnv(mode, process.cwd()).VITE_APP_ENV === 'production'
      ? '/vite-react-template/'
      : '/'

  return defineConfig({
    plugins: [
      react(),
      windicss(),
      injectHtml({
        injectData: {
          // html usage: <%= VITE_APP_ENV %>
          VITE_APP_ENV: loadEnv(mode, process.cwd()).VITE_APP_ENV
          // injectScript: '<script src="./inject.js"></script>'
        }
      }),
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: name => {
              return `antd/es/${name}/style/css`
            }
          }
        ]
      }),
      antdDayjs()
    ],
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
