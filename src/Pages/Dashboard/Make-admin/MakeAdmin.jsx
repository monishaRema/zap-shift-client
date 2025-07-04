import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Swal from "sweetalert2";
import { FaUserShield, FaUser } from "react-icons/fa";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 400);

  const {
    data: users = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userSearch", debouncedSearch],
    enabled: !!debouncedSearch.trim(),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${debouncedSearch}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ userId, newRole }) =>
      axiosSecure.patch(`/users/${userId}/role`, { role: newRole }),
    onSuccess: (data, variables) => {
      Swal.fire("Success", `Role updated to ${variables.newRole}`, "success");
      refetch(); // ✅ Immediately refresh table data
    },
    onError: () => {
      Swal.fire("Error", "Could not update role", "error");
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    const confirm = await Swal.fire({
      title: "Confirm Role Change",
      text: `Are you sure you want to make this user an ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      mutation.mutate({ userId, newRole });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Admin Access</h2>

      <div className="mb-4 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by email..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isFetching && <span className="loading loading-spinner loading-xs mt-1"></span>}
      </div>

      {!isFetching && debouncedSearch && users.length === 0 && (
        <p className="text-gray-500 mt-4">No users found for "{debouncedSearch}"</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Current Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "Unknown"}
                  </td>
                  <td
                    className={`capitalize font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700 rounded px-2 py-1 inline-block"
                        : ""
                    }`}
                  >
                    {user.role || "user"}
                  </td>
                  <td>
                    <button
                      className={`btn btn-xs ${
                        user.role === "admin" ? "btn-warning" : "btn-success"
                      } flex items-center gap-2`}
                      onClick={() =>
                        handleRoleChange(user._id, user.role === "admin" ? "user" : "admin")
                      }
                      disabled={mutation.isPending}
                    >
                      {user.role === "admin" ? <FaUser /> : <FaUserShield />}
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
