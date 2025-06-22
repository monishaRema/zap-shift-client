import React from "react";
import {
  FaTruckPickup,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const steps = [
  {
    title: "Booking Pick & Drop",
    description:
      "Schedule a convenient pickup and delivery — we handle the rest with speed and reliability for your personal or business parcels.",
    icon: <FaTruckPickup size={42} className="text-primary" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "Offer your customers peace of mind with flexible cash payment options on delivery across Bangladesh — secure and trusted.",
    icon: <FaMoneyBillWave size={42} className="text-primary" />,
  },
  {
    title: "Delivery Hub",
    description:
      "Drop off or collect packages from our local delivery hubs across the country — fast and hassle-free logistics near you.",
    icon: <FaWarehouse size={42} className="text-primary" />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "Tailored logistics services for SMEs and enterprises — streamline operations with contract pickups and scheduled deliveries.",
    icon: <FaBuilding size={42} className="text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="pt-15 pb-25">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="sub-heading text-primary mb-8">
            How it Works
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white hover:shadow-lg transition"
              >
                <div className="flex mb-4">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
