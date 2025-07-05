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
import DashboardLaout from "../Layout/DashboardLayout";
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
import MakeAdmin from "../Pages/Dashboard/Make-admin/MakeAdmin";
import Forbidden from "../Pages/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Pages/Dashboard/Parcels/AssignRider";
import AllParcels from "../Pages/Dashboard/Parcels/AllParcels";
import RiderRoute from "./RiderRoute";
import PendingTasks from "../Pages/Dashboard/Rider/PendingTasks";

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
      },{
        path:"forbidden",
        Component: Forbidden
      }
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
       // ✅ Rider-only routes
      {
        path:'pending-tasks',
        element:<RiderRoute>
          <PendingTasks></PendingTasks>
        </RiderRoute>
      },

       // ✅ Admin-only routes
      {
        path: "pending-riders",
        element: (
          <AdminRoute>
            <PendingRiders />
          </AdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRoute>
            <ActiveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "all-riders",
        element: (
          <AdminRoute>
            <AllRiders />
          </AdminRoute>
        ),
      },
      {
        path: "deactivated-riders",
        element: (
          <AdminRoute>
            <DeactivatedRiders />
          </AdminRoute>
        ),
      },
      {
        path: "rejected-riders",
        element: (
          <AdminRoute>
            <RejectedRiders />
          </AdminRoute>
        ),
      },
      {
        path: "make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "all-parcels",
        element: (
          <AdminRoute>
           <AllParcels></AllParcels>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
