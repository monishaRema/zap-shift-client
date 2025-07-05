import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useUserRole from "../../Hooks/useUserRole";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();
  const { refetch } = useUserRole();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const userData = {
          email: user.email,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_loggedIn: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userData);
        console.log(userRes.data);
        await refetch();
        navigate(from);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-gray-200 border-gray-200 hover:bg-gray-300 text-black w-full capitalize text-base"
      >
        Continue with google
      </button>
    </>
  );
};

export default SocialLogin;
