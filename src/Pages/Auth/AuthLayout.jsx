import React from "react";
import Logo from "../Shared/Logo";
import AuthImage from "../../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="py-10 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl ">
        <div className="flex flex-col md:flex-row-reverse justify-center">
          <div className="img-box flex-1 bg-accent/10 flex items-center justify-center p-5">
            <img
              src={AuthImage}
              alt="Authentication Illustration"
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
          <div className="form-box flex-1 px-10 pt-5 pb-10">
            <div className="mb-10">
              <Logo></Logo>
            </div>
            <div className="max-w-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
