import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AiOutlineDelete } from "react-icons/ai";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

function ManageItems() {
  const [menu] = useMenu();
  console.log(menu)

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Retrieve the JWT token
          const token = localStorage.getItem("access-token");
          if (!token) {
            Swal.fire({
              title: "Error!",
              text: "No token found. Please log in again.",
              icon: "error",
            });
            return;
          }
  
          // Make DELETE request
          const response = await fetch(`http://localhost:5000/menu/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "The item has been deleted successfully.",
              icon: "success",
            }).then(() => {
              // Reload the page after the success alert is closed
              window.location.reload();
            });
          } else {
            const errorData = await response.json();
            Swal.fire({
              title: "Error!",
              text: errorData.message || "Failed to delete the item.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Unable to connect to the server.",
            icon: "error",
          });
          console.error("Error:", error);
        }
      }
    });
  };
  
  

  return (
    <div>
      <SectionTitle heading={"Manage All Items"} subHeading={"Hurry up"} />

      <table className="table-auto min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-hotel-primary text-white">
            <th className="px-6 py-4 text-left text-lg">#</th>
            <th className="px-6 py-4 text-left text-lg">Image</th>
            <th className="px-6 py-4 text-left text-lg">Name</th>
            <th className="px-6 py-4 text-left text-lg">price</th>
            <th className="px-6 py-4 text-left text-lg">update</th>
            <th className="px-6 py-4 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((menu, index) => (
            <tr
              key={menu._id}
              className="border-b hover:bg-hotel-primary hover:bg-opacity-20 transition-colors"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900">
                <img src={menu.image} className="h-[60px] w-[60px]" alt="" />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {menu.name}
              </td>
              <td className="px-6 py-4 text-gray-600">${menu.price}</td>
              <td className="px-6 py-4 text-hotel-primary">
                <button
                  onClick={() => handleEditItem(menu._id)}
                  className="bg-red-500 text-white px-2 py-2 rounded  hover:bg-red-700 duration-300 transition-all"
                >
                  <FaEdit size={20} />
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(menu._id)}
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
  );
}

export default ManageItems;
