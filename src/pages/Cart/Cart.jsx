import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import DynamicCover from "../Shared/DynamicCover/DynamicCover";
import banner from "../../assets/shop/banner2.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../providers/AuthProvider";

function Cart() {
  const { user } = useContext(AuthContext); // Get user info from the auth context
  const { cart, isLoading } = useCart();

  // Aggregate cart items by unique products (based on the product's ID)
  const aggregatedCart = cart.reduce((cartItems, item) => {
    const existingItem = cartItems.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      cartItems.push({ ...item, totalPrice: item.price * item.quantity });
    }
    return cartItems;
  }, []);

  // Calculate total price
  const totalPrice = aggregatedCart.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  if (isLoading) {
    return <div>Loading cart items...</div>;
  }

  return (
    <>
      <DynamicCover
        bgImage={banner}
        title="Your Cart"
        description="Review your selected items before checkout. You can update quantities, remove items, or proceed to payment."
      />

      <div className="container mx-auto px-4 py-8">
        <SectionTitle heading={"Your Cart"} subHeading={"Review your selected items"} />

        {aggregatedCart.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {aggregatedCart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-hotel-primary mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-800 font-bold mb-4">
                    Total: ${item.totalPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total price section */}
            <div className="mt-8 p-6 bg-hotel-secondary rounded-lg shadow-lg text-white text-center">
              <h3 className="text-2xl font-bold">Total Price</h3>
              <p className="text-4xl font-extrabold mt-2">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </>
  );
}

export default Cart;
