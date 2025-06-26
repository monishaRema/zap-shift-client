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
import DashboardLaout from "../Layout/DashboardLaout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import TrackPackage from "../Pages/Dashboard/MyParcels/TrackPackage";
import Profile from "../Pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "coverage",
        loader: () => fetch("data/warehouses.json"),
        Component: Coverage,
      },
      {
        path: "sendParcel",
        loader: () => fetch("data/warehouses.json"),
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "forgot-password",
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLaout></DashboardLaout>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: MyParcels,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "track-package",
        Component: TrackPackage,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);

export default router;
