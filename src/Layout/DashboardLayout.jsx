import React, { use } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../Pages/Shared/Logo";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaSearchLocation,
  FaMotorcycle,
  FaClipboardList,
  FaUserCheck,
  FaUserTimes,
  FaUser,
  FaUserShield,
  FaBox,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const DashboardLayout = () => {
  const queryClient = useQueryClient();
  const {user,logOut} = useAuth()
  const navigate = useNavigate()
  const { role, roleLoading } = useUserRole();

  const handleLogout = async ()=>{
    await logOut()
      queryClient.clear(); // clears all react-query cache
  navigate("/login");
  }

  if (roleLoading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  return (
    <section>
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col ">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full lg:hidden">
              <div className="flex-none ">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
            </div>
            <div className="px-5">
              {/* Page content here */}
              <Outlet></Outlet>
              {/* Page content here */}
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <Logo />

              <li>
                <NavLink to="/" className="flex items-center gap-2">
                  <FaHome /> Home
                </NavLink>
              </li>

              {!roleLoading && role?.toLowerCase() === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/myParcels"
                      className="flex items-center gap-2"
                    >
                      <FaBoxOpen /> My Parcels
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className="flex items-center gap-2"
                    >
                      <FaCreditCard /> Payment History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/track-package"
                      className="flex items-center gap-2"
                    >
                      <FaSearchLocation /> Track Package
                    </NavLink>
                  </li>
                </>
              )}
              {!roleLoading && role?.toLowerCase() === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/pending-tasks"
                      className="flex items-center gap-2"
                    >
                      <FaTasks /> Pending Tasks
                    </NavLink>
                  </li>
                </>
              )}

              {!roleLoading && role?.toLowerCase() === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-parcels"
                      className="flex items-center gap-2"
                    >
                      <FaBox /> All Parcels
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/assign-rider"
                      className="flex items-center gap-2"
                    >
                      <FaMotorcycle /> Assign Rider
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/pending-riders"
                      className="flex items-center gap-2"
                    >
                      <FaClipboardList /> Pending Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-riders"
                      className="flex items-center gap-2"
                    >
                      <FaUserCheck /> All Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/deactivated-riders"
                      className="flex items-center gap-2"
                    >
                      <FaUserTimes /> Deactivated Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/make-admin"
                      className="flex items-center gap-2"
                    >
                      <FaUserShield /> Make Admin
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-2"
                >
                  <FaUser /> User Profile
                </NavLink>
              </li>
              <li>
               <button className="flex items-center gap-2 "
               onClick={()=>handleLogout()}
               >
               
                 <FaSignOutAlt />
                Log Out
               </button>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
