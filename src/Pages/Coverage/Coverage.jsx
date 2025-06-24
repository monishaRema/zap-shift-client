import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const warehouses = useLoaderData();

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Pass warehouses to BangladeshMap */}
      <div className="w-full">
        <BangladeshMap warehouses={warehouses} />
      </div>
    </div>
  );
};

export default Coverage;
