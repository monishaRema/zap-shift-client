import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Get all unassigned parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["unassignedParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data;
    },
  });

  // Get available riders based on region
  const {
    data: availableRiders = [],
    isLoading: ridersLoading,
  } = useQuery({
    queryKey: ["availableRiders", selectedParcel?.sender_region],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/available?region=${selectedParcel.sender_region}`
      );
      return res.data;
    },
  });

  // Mutation to assign parcel to rider
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      return await axiosSecure.patch(`/parcels/assign/${parcelId}`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
        riderContact: rider.contact,
      });
    },
    onSuccess: (res) => {
      Swal.fire("Assigned!", "Rider has been assigned to the parcel.", "success");
      setSelectedParcel(null);
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error", err?.response?.data?.message || "Assignment failed", "error");
    },
  });

  const handleAssign = (rider) => {
    if (!selectedParcel) return;

    assignMutation.mutate({
      parcelId: selectedParcel._id,
      rider,
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      {isLoading && <p>Loading parcels...</p>}
      {isError && <p className="text-red-500">Failed to load parcels</p>}

      {!isLoading && parcels.length === 0 && (
        <p className="text-gray-600">No parcels to assign.</p>
      )}

      {parcels.length > 0 && (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id} className="hover">
                  <td>{i + 1}</td>
                  <td className="font-semibold">{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.sender_center}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>${parcel.cost}</td>
                  <td className="text-green-600">{parcel.payment_status}</td>
                  <td>
                    <span className="badge badge-warning">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-primary flex items-center gap-1"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      <FaUserPlus /> Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to assign rider */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90vw] max-w-2xl relative">
            <h3 className="text-xl font-bold mb-4">
              Assign Rider – {selectedParcel.tracking_id}
            </h3>
            <button
              className="absolute right-3 top-3 text-gray-600 hover:text-red-600"
              onClick={() => setSelectedParcel(null)}
            >
              ✖
            </button>

            {ridersLoading ? (
              <p>Loading available riders...</p>
            ) : availableRiders.length === 0 ? (
              <p className="text-gray-500">
                No available riders in {selectedParcel.sender_region}
              </p>
            ) : (
              <ul className="grid gap-3">
                {availableRiders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{rider.name}</p>
                      <p className="text-sm text-gray-500">{rider.email}</p>
                      <p className="text-sm text-gray-500">📞 {rider.contact}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAssign(rider)}
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
