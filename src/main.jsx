import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './error-page.jsx';
import Root from './routes/root.jsx'
import OGame from './routes/AiIsO.jsx'
import XGame from './routes/AiIsX.jsx';
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
        path='xgame'
        element={<XGame/>}
      />
      <Route 
        path='ogame'
        element={<OGame/>}
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
