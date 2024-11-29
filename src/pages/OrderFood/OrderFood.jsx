import React, { useContext, useState } from "react";
import useMenu from "../../hooks/useMenu"; // Import your custom hook
import DynamicCover from "../Shared/DynamicCover/DynamicCover";
import banner from "../../assets/menu/banner3.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { AuthContext } from "../../providers/AuthProvider";
import useCart from "../../hooks/useCart";

function OrderFood() {
  const [menu, loading] = useMenu(); // Fetch the menu data using your hook
  const [selectedCategory, setSelectedCategory] = useState("salad"); // Set default category
  const { user } = useContext(AuthContext); // Get logged-in user (from your context or auth hook)
  const [,refetch] = useCart();

  // Custom categories
  const categories = [
    "salad",
    "drinks",
    "popular",
    "dessert",
    "pizza",
    "soup",
    "offered",
  ];

  // Filter menu items based on selected category
  const filteredMenu = menu.filter(
    (item) => item.category === selectedCategory
  );

  // Handle add to cart
  const handleAddToCart = (item) => {
    console.log(item)
    if (!user) {
      // If the user is not logged in, show SweetAlert
      Swal.fire({
        title: "Please log in",
        text: "You need to log in to add products to your cart!",
        icon: "warning",
        confirmButtonText: "Log in",
      });
      return;
    }

    const cartItem = {
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      itemId: item._id,
      email: user.email, // Add the user's email to the cart item
      quantity: 1, // Default quantity is 1, you can modify this later
    };

    // Send POST request to the backend
    fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          refetch(); // refetch cart to update the number of the items in the cart
          Swal.fire("Success", "Item added to cart successfully!", "success");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DynamicCover title={"Order Food"} bgImage={banner} />
      <div className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <SectionTitle heading={"Order Your Food"} />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 mx-2 text-lg font-medium rounded-[10px] transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-hotel-primary text-white"
                  : "bg-hotel-secondary text-white hover:bg-hotel-primary hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-hotel-primary mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">{item.recipe}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-hotel-primary">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    className="bg-hotel-primary text-white px-4 py-2 rounded-full hover:bg-hotel-secondary transition-colors"
                    onClick={() => handleAddToCart(item)} // Add to cart action
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderFood;
