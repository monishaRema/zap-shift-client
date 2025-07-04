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
import TrackPackage from "../Pages/Dashboard/Tracking/TrackPackage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import BeRider from "../Pages/Dashboard/Rider/BeRider";
import PendingRiders from "../Pages/Dashboard/Rider/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/Rider/ActiveRiders";
import AllRiders from "../Pages/Dashboard/Rider/AllRiders";
import DeactivatedRiders from "../Pages/Dashboard/Rider/DeactivatedRiders";
import RejectedRiders from "../Pages/Dashboard/Rider/RejectedRiders";

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
        path:'beRider',
        loader: () => fetch("data/warehouses.json"),
        element:<PrivateRoutes>
          <BeRider></BeRider>
        </PrivateRoutes>
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
        path: "track-package/:trackingId?",
        Component: TrackPackage,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "pending-riders",
        Component: PendingRiders
      },
       {
        path: "all-riders",
        Component: AllRiders
      },
       {
        path: "deactivated-riders",
        Component: DeactivatedRiders
      },
             {
        path: "rejected-riders",
        Component: RejectedRiders
      },
      {
        path:"active-riders",
        Component: ActiveRiders
      }
    ],
  },
]);

export default router;
