import { createBrowserRouter } from 'react-router'

import { NotFound } from './pages/404'
import { Home } from './pages/app/home'
import { Redirect } from './pages/app/redirect'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:shortUrl',
        element: <Redirect />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])