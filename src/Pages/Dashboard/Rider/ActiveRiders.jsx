import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaUserSlash } from "react-icons/fa";

function RiderModal({ rider, onClose }) {
  if (!rider) return null;
  return (
    <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90vw] max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{rider.name}</h2>
        <div className="grid gap-2">
          <div><b>Email:</b> {rider.email}</div>
          <div><b>Age:</b> {rider.age}</div>
          <div><b>Region:</b> {rider.region}</div>
          <div><b>District:</b> {rider.district}</div>
          <div><b>Warehouse:</b> {rider.warehouse}</div>
          <div><b>Bike Registration:</b> {rider.bike_registration}</div>
          <div><b>NID:</b> {rider.nid}</div>
          <div><b>Contact:</b> {rider.contact}</div>
          <div><b>Status:</b> <span className="text-green-600 font-bold">{rider.status}</span></div>
          <div><b>Created At:</b> {new Date(rider.created_at).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

const statusConfig = {
  deactivated: {
    swal: {
      title: "Deactivate Rider?",
      text: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      confirmButtonText: "Deactivate",
      confirmButtonColor: "#f59e42",
    },
    success: "Rider has been deactivated.",
    icon: <FaUserSlash />,
    color: "text-yellow-600 hover:text-yellow-800",
    label: "Deactivate",
  },
};

const ActiveRiders = () => {
  const [modalRider, setModalRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active-riders");
      return res.data;
    },
  });

  const handleStatusChange = async (id) => {
    const config = statusConfig.deactivated;

    const confirm = await Swal.fire({
      ...config.swal,
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        Swal.fire({
          title: "Processing...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const res = await axiosSecure.patch(`/riders/${id}`, { status: "deactivated" });
        Swal.close();

        if (res.data.matchedCount === 0) {
          Swal.fire("Not found!", "Rider not found.", "error");
        } else if (res.data.modifiedCount === 0) {
          Swal.fire("No change!", "Status was already deactivated.", "info");
        } else {
          Swal.fire("Success!", config.success, "success");
          refetch();
        }
      } catch (err) {
        Swal.close();
        Swal.fire("Error!", err?.response?.data?.message || err.message, "error");
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : riders.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No active riders.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Region</th>
                <th className="py-2 px-3">District</th>
                <th className="py-2 px-3">Warehouse</th>
                <th className="py-2 px-3">Contact</th>
                <th className="py-2 px-3">Applied</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, i) => (
                <tr key={rider._id} className="border-b border-gray-200 last-of-type:border-0 hover:bg-gray-50">
                  <td className="py-2 px-3">{i + 1}</td>
                  <td className="py-2 px-3">{rider.name}</td>
                  <td className="py-2 px-3">{rider.email}</td>
                  <td className="py-2 px-3">{rider.region}</td>
                  <td className="py-2 px-3">{rider.district}</td>
                  <td className="py-2 px-3">{rider.warehouse}</td>
                  <td className="py-2 px-3">{rider.contact}</td>
                  <td className="py-2 px-3">
                    {new Date(rider.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      className="p-2 text-blue-600 hover:text-blue-800"
                      onClick={() => setModalRider(rider)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {/* Deactivate */}
                    <button
                      className={`p-2 ${statusConfig.deactivated.color}`}
                      onClick={() => handleStatusChange(rider._id)}
                      title={statusConfig.deactivated.label}
                    >
                      {statusConfig.deactivated.icon}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Rider Detail Modal */}
      <RiderModal rider={modalRider} onClose={() => setModalRider(null)} />
    </div>
  );
};

export default ActiveRiders;
