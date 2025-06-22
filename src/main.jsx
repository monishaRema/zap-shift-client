import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import 'aos/dist/aos.css'; 
import './App.css'
import Aos from 'aos';

Aos.init({
  duration: 1000,
  once: true,
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
