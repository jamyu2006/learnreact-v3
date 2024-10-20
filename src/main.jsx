import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './error-page.jsx';
import Root from './routes/root.jsx'
import Game from './routes/AiIsO.jsx'
import { action as rootAction } from './routes/root.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root/>}
      action={rootAction}
      errorElement={<ErrorPage/>}
    >
      <Route 
        path='game'
        element={<Game/>}
      />
    </Route>
  )
);
//<Game/>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
