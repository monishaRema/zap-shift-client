import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allParcels", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/all-parcels?page=${page}&limit=10`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const parcels = data?.parcels || [];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Parcels</h2>

      {isLoading && <p>Loading parcels...</p>}
      {isError && <p className="text-red-500">Error loading parcels</p>}

      {!isLoading && parcels.length > 0 && (
        <>
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
                  <th>Delivery</th>
                  <th>Rider</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, i) => (
                  <tr key={parcel._id}>
                    <td>{(page - 1) * 10 + i + 1}</td>
                    <td className="font-semibold">{parcel.tracking_id}</td>
                    <td>{parcel.title}</td>
                    <td>{parcel.sender_name}</td>
                    <td>{parcel.receiver_name}</td>
                    <td>{parcel.sender_center}</td>
                    <td>{parcel.receiver_center}</td>
                    <td>${parcel.cost}</td>
                    <td className="capitalize">{parcel.payment_status}</td>
                    <td className="capitalize">{parcel.delivery_status}</td>
                    <td className="capitalize">{parcel?.rider?.riderName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: data.totalPages }, (_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${page === idx + 1 ? "btn-primary" : ""}`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllParcels;
