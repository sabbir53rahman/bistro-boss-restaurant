import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUser, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

function AllUsers() {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  });

  // make admin function

  const handleMakeAdmin = id => {
    fetch(`http://localhost:5000/users/admin/${id}`,{
      method:'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "This user is an Admin now",
          showConfirmButton: false,
          timer: 1500
        });
      }
      
    })
  }

  // Function to handle delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted successfully!");
        refetch(); // Refetch the users after deleting one
      } else {
        alert("Failed to delete the user.");
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h3 className="text-4xl font-bold text-center text-hotel-primary mb-8">
        Total Users: {users.length}
      </h3>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-hotel-primary text-white">
              <th className="px-6 py-4 text-left text-lg">#</th>
              <th className="px-6 py-4 text-left text-lg">Name</th>
              <th className="px-6 py-4 text-left text-lg">Email</th>
              <th className="px-6 py-4 text-left text-lg">Role</th>
              <th className="px-6 py-4 text-left text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-hotel-primary hover:bg-opacity-20 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-hotel-primary">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-red-500 text-white px-2 py-2 rounded  hover:bg-red-700 duration-300 transition-all"
                    >
                      <FaUsers size={20} />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-2 rounded  hover:bg-red-700 duration-300 transition-all"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
