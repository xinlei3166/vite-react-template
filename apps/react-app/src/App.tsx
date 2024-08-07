// import { Provider } from 'react-redux'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from 'react-router-dom'
// import loadable from '@/components/loadable'
// import { useMenus } from '@/router'
// import store from '@/store'

// function createRoutes(routes: any[]) {
//   return routes.map((route: any) => (
//     <Route
//       key={route.name || route.path}
//       index={!!route.index as any}
//       path={route.path}
//       element={loadable(route.element)}
//       handle={route.handle}
//     >
//       {route.children?.map((childRoute: any) => (
//         <Route
//           key={childRoute.name || childRoute.path}
//           path={childRoute.path}
//           element={loadable(childRoute.element)}
//           handle={childRoute.handle}
//         />
//       ))}
//     </Route>
//   ))
// }
//
// function createRouter() {
//   const routes = useMenus()
//   return function App() {
//     return (
//       <Provider store={store}>
//         <Router basename={import.meta.env.BASE_URL}>
//           <Routes>
//             <Route
//               key="root"
//               path="/"
//               element={loadable(() => import('@/components/layout'))}
//             >
//               {createRoutes(routes)}
//             </Route>
//             <Route path="*" element={<Navigate to="/404" />} />
//           </Routes>
//         </Router>
//       </Provider>
//     )
//   }
// }
//
// function App() {
//   const Router = createRouter()
//   return <Router />
// }
// createRoutesFromElements
// export default App

// use RouterProvider and data router
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import store from '@/store'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
