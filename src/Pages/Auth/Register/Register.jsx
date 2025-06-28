import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ImageUpload from "../../../assets/image-upload-icon.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastIcon } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(ImageUpload);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {

        const userData = {
          email:data.email,
          role:'user', //default role
          created_at: new Date().toISOString(),
          last_loggedIn: new Date().toISOString()
        }


        // user profile data name and photo
        const userProfileData = {
          displayName: data.name,
          photoURL: profilePic,
        };
        // upadate profile data in firebase
        updateUserProfile(userProfileData)
          .then((result) => {
            Swal.fire({
              title: "Your Profile created successfuly",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1500,
              icon: "success",
            });
            navigate("/dashboard"); //navigate to dashboard
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_api_key
    }`;

    // upload data  to imgbb
    await axios
      .post(imgUploadUrl, formData)
      .then((result) => {
        setProfilePic(result.data.data.url);
        setProfilePicUrl(result.data.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black mb-2 text-black">
        Create an Account
      </h2>
      <p className="text-desc mb-6">Register with Profast</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label" htmlFor="profile_img">
            <img
              src={profilePicUrl}
              alt="image upload icon"
              className="size-15 rounded-full object-cover"
            ></img>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            id="profile_img"
            className="hidden"
          />
        </fieldset>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input theme-input"
            placeholder="Name"
            name="name"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name?.type === "required" && (
            <span className="text-red-500">Name is required</span>
          )}
        </fieldset>

        <fieldset className="flex flex-col mb-5">
          <label className="theme-label" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            {...register("email", {
              required: true,
            })}
            className="input theme-input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500">Email is required</span>
          )}
        </fieldset>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input theme-input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-500">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500">
              Password musbt be 6 characters or more
            </span>
          )}
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
