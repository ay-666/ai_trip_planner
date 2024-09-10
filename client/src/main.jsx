import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import { Home } from 'lucide-react'
import CreateTrip from './components/CreateTrip.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './components/ViewTrip.jsx'
import ErrorPage from './components/shared/ErrorPage.jsx'
import MyTrip from './components/MyTrip.jsx'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<ErrorPage />
  },{
    path:'/create-trip',
    element: <CreateTrip />
  },{
    path:'/view-trip/:tripId',
    element:<ViewTrip />
  },{
    path:'/my-trips',
    element:<MyTrip />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <RouterProvider router={appRouter}></RouterProvider>
    <Toaster/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
