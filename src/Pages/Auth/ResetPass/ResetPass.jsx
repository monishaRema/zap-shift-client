import React from "react";

const ResetPass = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-black mb-2 text-black">
       Reset Password
      </h2>
      <p className="text-desc mb-6">Reset your password</p>
      <form action="">
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">New Password</label>
         <input
            type="password"
            className="input theme-input"
            placeholder="New Password"
          />
        </fieldset>
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">Confirm Password</label>

          <input
            type="password"
            className="input theme-input"
            placeholder="Confirm Password"
          />
        </fieldset>

        <button className="btn btn-accent w-full text-black capitalize text-base">
         Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
