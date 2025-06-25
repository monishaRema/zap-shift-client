import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Pages/Auth/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ForgotPass from "../Pages/Auth/ForgotPass/ForgotPass";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path:'coverage',
        loader: ()=> fetch("data/warehouses.json"),
        Component:Coverage
      },
      {
        path: "sendParcel",
        loader: ()=> fetch("data/warehouses.json"),
        element:<PrivateRoutes>
          <SendParcel></SendParcel>
        </PrivateRoutes>
      }
   
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", 
        element: <Login />
      },
       { path: "register", 
        element: <Register />
      },
      {
        path: "forgot-password",
        element: <ForgotPass />
      }
    ]
  }
 ])

export default router;