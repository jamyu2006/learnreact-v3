import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import ErrorPage from './error-page.jsx';
import Root from './routes/root.jsx'
import Game from './routes/tictactoe.jsx';
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
        element={<Game key="xgame" whomoves={"playerisO"}/>}
      />
      <Route 
        path='ogame'
        element={<Game key="ogame" whomoves={"playerisX"}/>}
      />
    </Route>
  )
);
//<XGame/>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
