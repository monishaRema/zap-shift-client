import React from "react";
import { Link } from "react-router";
import ImageUpload from "../../../assets/image-upload-icon.png"; 
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin";

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const {createUser} = useAuth();

    const onSubmit = data =>{
        console.log(data);
       createUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.error("Error creating user:", error);
        });
    }
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black mb-2 text-black">
        Create an Account
      </h2>
      <p className="text-desc mb-6">Register with Profast</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <img src={ImageUpload} alt="image upload icon" className="mb-5"></img>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">Name</label>
          <input
            type="text"
            className="input theme-input"
            placeholder="Name"
          />
        </fieldset>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">Email</label>

          <input
            type="email"
            {...register("email",{
                required: true,
                
            })}
            className="input theme-input"
            placeholder="Email"
          />
          {
           errors.email?.type === 'required' && <span className="text-red-500">Email is required</span>
            
          }
        </fieldset>
        <fieldset className="flex flex-col mb-5">
        
        <label className="theme-label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input theme-input"
            placeholder="Password"
          />
          {
            errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )
          }
          {
            errors.password?.type === "minLength" && (
              <span className="text-red-500">Password musbt be 6 characters or more</span>
            )
          }
        </fieldset>

        <button className="btn btn-accent w-full text-black capitalize text-base">
          Register
        </button>
      </form>
      <p className="text-gray-500 mt-2 mb-5">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-lime-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
      
    </div>
  );
};

export default Register;
