import React from "react";

const ServiceCard = ({ service }) => {
    const { title, description, icon } = service;

 
  return (
    <div
      className="p-6 rounded-2xl bg-gray-200 text-primary transition-all duration-300 hover:bg-lime-200 flex flex-col items-center gap-4 text-center"
    >
      <div className="size-22 rounded-full bg-gradient-to-b from-gray-50 to-transparent flex justify-center items-center">{icon}</div>
      <h3 className="font-bold text-lg md:text-xl">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default ServiceCard;
