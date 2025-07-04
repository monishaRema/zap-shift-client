import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaUserSlash,
} from "react-icons/fa";

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
          <div><b>Status:</b> <span className="text-orange-600 font-bold">{rider.status}</span></div>
          <div><b>Created At:</b> {new Date(rider.created_at).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

const statusConfig = {
  active: {
    swal: {
      title: "Approve Rider?",
      text: "Are you sure you want to approve this rider?",
      icon: "question",
      confirmButtonText: "Approve",
      confirmButtonColor: "#22c55e",
    },
    success: "Rider has been approved.",
    icon: <FaCheckCircle />,
    color: "text-green-600 hover:text-green-800",
    label: "Approve",
  },
  rejected: {
    swal: {
      title: "Reject Rider?",
      text: "Are you sure you want to reject this rider?",
      icon: "warning",
      confirmButtonText: "Reject",
      confirmButtonColor: "#ef4444",
    },
    success: "Rider has been rejected.",
    icon: <FaTimesCircle />,
    color: "text-red-600 hover:text-red-800",
    label: "Reject",
  },
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

const AllRiders = () => {
  const [modalRider, setModalRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status, email) => {
    const config = statusConfig[status];
    if (!config) return;

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

        const res = await axiosSecure.patch(`/riders/${id}`, { status, email });
        Swal.close();

        if (res.data.matchedCount === 0) {
          Swal.fire("Not found!", "Rider not found.", "error");
        } else if (res.data.modifiedCount === 0) {
          Swal.fire("No change!", "Status was already set.", "info");
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
      <h2 className="text-2xl font-bold mb-4">All Riders</h2>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : riders.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No riders found.</div>
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
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Applied</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, i) => (
                <tr
                  key={rider._id}
                  className="border-b border-gray-200 last-of-type:border-0 hover:bg-gray-50"
                >
                  <td className="py-2 px-3">{i + 1}</td>
                  <td className="py-2 px-3">{rider.name}</td>
                  <td className="py-2 px-3">{rider.email}</td>
                  <td className="py-2 px-3">{rider.region}</td>
                  <td className="py-2 px-3">{rider.district}</td>
                  <td className="py-2 px-3">{rider.warehouse}</td>
                  <td className="py-2 px-3">{rider.contact}</td>
                  <td className="py-2 px-3 capitalize">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold
                        ${rider.status === "active" && "bg-green-100 text-green-700"}
                        ${rider.status === "pending" && "bg-yellow-100 text-yellow-700"}
                        ${rider.status === "rejected" && "bg-red-100 text-red-700"}
                        ${rider.status === "deactivated" && "bg-gray-200 text-gray-700"}`}
                    >
                      {rider.status}
                    </span>
                  </td>
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
                    <button
                      className={`p-2 ${statusConfig.active.color}`}
                      onClick={() => handleStatusChange(rider._id, "active", rider.email)}
                      title={statusConfig.active.label}
                      disabled={rider.status === "active"}
                    >
                      {statusConfig.active.icon}
                    </button>
                    <button
                      className={`p-2 ${statusConfig.rejected.color}`}
                      onClick={() => handleStatusChange(rider._id, "rejected", rider.email)}
                      title={statusConfig.rejected.label}
                      disabled={rider.status === "rejected"}
                    >
                      {statusConfig.rejected.icon}
                    </button>
                    <button
                      className={`p-2 ${statusConfig.deactivated.color}`}
                      onClick={() => handleStatusChange(rider._id, "deactivated", rider.email)}
                      title={statusConfig.deactivated.label}
                      disabled={rider.status === "deactivated"}
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
      <RiderModal rider={modalRider} onClose={() => setModalRider(null)} />
    </div>
  );
};

export default AllRiders;
