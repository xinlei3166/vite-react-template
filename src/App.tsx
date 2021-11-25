import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useMenus } from '@/router'
import { IRoute } from '@/interface'
import loadable from '@/components/loadable'

function childRoutes(routes: IRoute[]) {
  return routes.map((route: IRoute) => (
    <Route
      key={route.name || route.path}
      path={route.path}
      element={loadable(route.element)}
    >
      {route.children?.map((childRoute: IRoute) => (
        <Route
          key={route.path}
          path={childRoute.path}
          element={loadable(childRoute.element)}
        />
      ))}
    </Route>
  ))
}

function useRouter() {
  const routes = useMenus()
  return function App() {
    return (
      <Router>
        <Routes>
          <Route
            key="root"
            path="/"
            element={loadable(() => import('@/components/layout'))}
          >
            <Route
              key="home"
              index
              element={loadable(() => import('@/views/home'))}
            />
            {childRoutes(routes)}
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    )
  }
}

function App() {
  const Router = useRouter()
  return <Router />
}

export default App
