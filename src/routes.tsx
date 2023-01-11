// Based on https://omarelhawary.me/blog/file-based-routing-with-react-router

import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const PRESERVED: Record<string, any> = import.meta.glob('/src/pages/(_app|404).tsx', {
  eager: true,
})
const ROUTES: Record<string, any> = import.meta.glob('/src/pages/**/[a-z[]*.tsx')

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, '')
  return { ...preserved, [key]: PRESERVED[file].default }
}, {}) as Record<string, any>

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')

  const Component = lazy(ROUTES[route])
  return { path, component: <Component /> }
})

export const AppRoutes = () => {
  const App = preserved?.['_app'] || Fragment
  const NotFound = preserved?.['404'] || Fragment

  return (
    <Suspense>
      <App>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
          <Route path='*' element={NotFound} />
        </Routes>
      </App>
    </Suspense>
  )
}
