import {
  BrowserRouter as Router,
  useRoutes as _useRoutes
} from 'react-router-dom'
import { createRoutes, useMenus } from '@/router'
import Layout from '@/components/layout'

function useRoutes() {
  const routes = useMenus()
  return function App() {
    // 这里只能有一个首页组件，添加其他组件在routes配置
    return _useRoutes([
      {
        path: '/',
        element: <Layout />,
        children: createRoutes(routes)
      }
    ])
  }
}

function App() {
  const Routes = useRoutes()

  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
