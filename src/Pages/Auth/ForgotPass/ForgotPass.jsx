import React from 'react';
import { Link } from 'react-router';

const ForgotPass = () => {
    return (
           <div>
      <h2 className="text-3xl md:text-4xl font-black mb-2 text-black">
       Forgot Password
      </h2>
      <p className="text-desc mb-6">Enter your email address and we’ll send you a reset link.</p>
      <form action="">
        <fieldset className="flex flex-col mb-5">
          <label className="theme-label">Email</label>
          <input
            type="email"
            className="input theme-input"
            placeholder="Email"
          />
        </fieldset>
       

        <button className="btn btn-accent w-full text-black Capitalize text-base">Send</button>
      </form>
        <p className="text-gray-500 mt-2 mb-5">
          Remember Password?{" "}
            <Link to="/login" className="text-lime-600 hover:underline font-semibold">
              Login
            </Link>
        </p>
      
    </div>
    );
};

export default ForgotPass;