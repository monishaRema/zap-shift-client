import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RiderImage from "../../../assets/agent-pending.png";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const BeRider = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const serviceCenter = useLoaderData(); // <-- all your location/warehouse data
  const axiosSecure = useAxiosSecure()
  // Unique regions
  const regions = [...new Set(serviceCenter.map((item) => item.region))];

  // State for the selected region and district
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Districts filtered by selected region
  const districts = [
    ...new Set(
      serviceCenter
        .filter((item) => item.region === selectedRegion)
        .map((item) => item.district)
    ),
  ];

  // Find the matching service center object
  const matchedCenter = serviceCenter.find(
    (item) =>
      item.region === selectedRegion && item.district === selectedDistrict
  );

  // Get its covered_area array, or empty array if not found
  const warehouses = matchedCenter?.covered_area || [];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // React to region/district changes
  useEffect(() => {
    setSelectedRegion(watch("region"));
    setSelectedDistrict(watch("district"));
    // eslint-disable-next-line
  }, [watch("region"), watch("district")]);

  const onSubmit = async (data) => {
    data.email = user?.email || ''
    data.name = user.displayName || data.name
    try {

      const res = await axiosSecure.post("/riders", data);
      if (res.data && (res.data.insertedId || res.data.success)) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your rider application is submitted and pending approval.",
          timer: 2500,
          showConfirmButton: false,
        });
        reset();
        navigate('/dashboard')
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Could not submit. Try again.",
      });
    }
  };

  return (
    <div className="bg-[#f5f6fa] min-h-screen flex items-center justify-center py-8 px-5">
      <div className="container bg-white rounded-2xl shadow-lg mx-auto">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row overflow-hidden items-center md:items-end">
          {/* Left Side - Form */}
          <div className="flex-1 px-8 py-10 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-black text-[#173c36] mb-2">
              Be a Rider
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
            <hr className="border-gray-200 mb-6" />
            <h2 className="text-xl font-semibold text-[#173c36] mb-6">
              Tell us about yourself
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="name"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={user?.displayName}
                    {...register("name", { required: true })}
                    readOnly={!!user?.displayName}
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                  />
                  {errors.name && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* Age */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="age"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Your age
                  </label>
                  <input
                    type="number"
                    id="age"
                    {...register("age", { required: true, min: 18, max: 60 })}
                    placeholder="Your age"
                    className="input input-bordered w-full"
                  />
                  {errors.age && (
                    <span className="text-red-500">18-60 only</span>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="email"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email}
                    {...register("email", { required: true })}
                    readOnly
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                  />
                  {errors.email && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* Region */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="region"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Your Region
                  </label>
                  <select
                    id="region"
                    {...register("region", { required: true })}
                    className="input input-bordered w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your region
                    </option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* District */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="district"
                    className="mb-1 font-medium text-gray-800"
                  >
                    District
                  </label>
                  <select
                    id="district"
                    {...register("district", { required: true })}
                    className="input input-bordered w-full"
                    defaultValue=""
                    disabled={!selectedRegion || !districts.length}
                  >
                    <option value="" disabled>
                      {districts.length
                        ? "Select district"
                        : "Select region first"}
                    </option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* NID */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="nid"
                    className="mb-1 font-medium text-gray-800"
                  >
                    NID No
                  </label>
                  <input
                    type="text"
                    id="nid"
                    {...register("nid", { required: true })}
                    placeholder="NID"
                    className="input input-bordered w-full"
                  />
                  {errors.nid && <span className="text-red-500">Required</span>}
                </div>
                {/* Contact */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="contact"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Contact
                  </label>
                  <input
                   type="tel" 
                    id="contact"
                    {...register("contact", { required: true })}
                    placeholder="Contact"
                    className="input input-bordered w-full"
                  />
                  {errors.contact && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
                {/* Bike Registration */}
                <div className="flex flex-col mb-1">
                  <label
                    htmlFor="bike_registration"
                    className="mb-1 font-medium text-gray-800"
                  >
                    Bike Registration
                  </label>
                  <input
                    type="text"
                    id="bike_registration"
                    {...register("bike_registration", { required: true })}
                    placeholder="Bike Registration"
                    className="input input-bordered w-full"
                  />
                  {errors.bike_registration && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>
              </div>
              {/* Warehouse selection, full width */}
              <div className="flex flex-col mb-1">
                <label
                  htmlFor="warehouse"
                  className="mb-1 font-medium text-gray-800"
                >
                  Which warehouse you want to work?
                </label>
                <select
                  id="warehouse"
                  {...register("warehouse", { required: true })}
                  className="input input-bordered w-full"
                  defaultValue=""
                  disabled={!warehouses.length}
                >
                  <option value="" disabled>
                    {warehouses.length
                      ? "Select warehouse"
                      : "Select region/district first"}
                  </option>
                  {warehouses.map((warehouse, idx) => (
                    <option key={idx} value={warehouse}>
                      {warehouse}
                    </option>
                  ))}
                </select>
                {errors.warehouse && (
                  <span className="text-red-500">Required</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-lime-300 hover:bg-lime-400 text-black py-2 rounded mt-2 font-semibold text-base transition"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Right Side - Image */}
          <div className="flex-1 bg-transparent flex items-center justify-center p-8">
            <img
              src={RiderImage}
              alt="Rider on bike"
              className="w-130 max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeRider;
