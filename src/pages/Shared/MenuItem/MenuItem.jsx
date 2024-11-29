import React from "react";

const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;

  return (
    <div className="menu-item p-8 border-b border-gray-300  flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
      {/* Image Section */}
      <div className="w-full lg:w-1/5">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Text Section */}
      <div className="lg:w-3/5 text-center lg:text-left">
        <h3 className="text-3xl font-serif text-hotel-primary mb-3">
          {name}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed italic">
          {recipe}
        </p>
      </div>

      {/* Price Section */}
      <div className="lg:w-1/5 text-center lg:text-right">
        <span className="text-2xl font-bold text-hotel-secondary">
          ${price}
        </span>
      </div>
    </div>
  );
};

export default MenuItem;
