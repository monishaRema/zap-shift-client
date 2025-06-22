import React from "react";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="py-5">
      <div className="container mx-auto px-5 bg-gray-900 rounded-4xl py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-5 justify-center items-center text-center">
            <Logo></Logo>
            <p className="text-gray-300 text-center">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Zap Shift. All rights reserved |
              Designed By{" "}
              <a href="#" className="text-accent">
                {" "}
                Monisha Rema
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
