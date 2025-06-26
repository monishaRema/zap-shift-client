import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
   const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from || '/';


  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user)
       navigate(from)
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
        Register with google
      </button>
    </>
  );
};

export default SocialLogin;
