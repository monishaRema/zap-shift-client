import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { refetch } = useUserRole();
  const from = location.state?.from || "/";

  const onSubmit =  (data) => {
    signIn(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
         await refetch();
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black mb-2 text-black">
        Welcome Back
      </h2>
      <p className="text-desc mb-6">Login with Profast</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input theme-input"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="flex flex-col mb-5">
          <div className="flex justify-between">
            <label className="theme-label">Password</label>
            <Link
              to="/forgot-password"
              className="underline text-gray-500 hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input theme-input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password must be 6 characters or longer
            </span>
          )}
        </fieldset>

        <button className="btn btn-accent w-full text-black capitalize text-base">
          Login
        </button>
      </form>
      <p className="text-gray-500 mt-2 mb-5">
        Don't have an account?{" "}
        <Link
          state={from}
          to="/register"
          className="text-lime-600 hover:underline font-semibold"
        >
          Register
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
