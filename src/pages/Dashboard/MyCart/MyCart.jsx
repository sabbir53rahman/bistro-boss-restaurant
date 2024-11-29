import React from "react";
import useCart from "../../../hooks/useCart";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function MyCart() {
  const [cart, refetch] = useCart();

  // Function to handle item removal
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-hotel-primary mb-6">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-hotel-primary text-white">
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-hotel-primary hover:bg-opacity-20 transition-colors"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-green-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 text-white px-2 py-2 rounded  hover:bg-red-700 transition-all duration-300"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Price Section */}
      {cart.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-2xl font-bold text-green-500">
              ${calculateTotal()}
            </p>
          </div>
          <div className="text-right mt-4">
            {cart.length ? (
              <Link to="/dashboard/payment">
                <button className="bg-hotel-primary text-white px-6 py-2 rounded-md hover:bg-hotel-secondary transition-all">
                  Checkout
                </button>
              </Link>
            ) : (
              <button disabled>Checkout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCart;
