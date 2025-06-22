import React from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast size={42} />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia size={42} />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse size={42} />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave size={42} />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding size={42} />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo size={42} />,
  },
];

const Services = () => {
  return (
    <section className="">
      <div className="container mx-auto px-5">
        <div className="py-25 px-10 bg-primary rounded-4xl">
          <div className="inner-box max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="sub-heading font-extrabold text-white mb-2">
                Our Services
              </h2>
              <p className="text-desc max-w-3xl mx-auto text-gray-300">
                Enjoy fast, reliable parcel delivery with real-time tracking and
                zero hassle. From personal packages to business shipments — we
                deliver on time, every time.
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service, idx) => (
                <ServiceCard key={idx} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
