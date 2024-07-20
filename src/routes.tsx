import { createBrowserRouter } from 'react-router-dom'

import { Initial } from './pages/Initial'
import { Chapters } from './pages/Chapters'

export const router = createBrowserRouter([
  { path: '/', element: <Initial /> },
  { path: '/chapters/:id/:type', element: <Chapters /> }
])
