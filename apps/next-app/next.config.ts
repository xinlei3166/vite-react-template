import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 输出单页面应用 (SPA)
  distDir: './dist', // 将构建输出目录更改为 `./dist/`
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
  transpilePackages: ['lodash-es']
}

export default nextConfig
