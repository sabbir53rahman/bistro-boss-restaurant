import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function AddItems() {
  // Define categories
  const categories = [
    "salad",
    "drinks",
    "popular",
    "dessert",
    "pizza",
    "soup",
    "offered",
  ];

  // Initialize useForm from react-hook-form
  const {
    register,
    handleSubmit,
    reset, // Import reset function
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    // Prepare the menuItem object
    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: data.image,
    };

    try {
      // Make a POST request to your API
      const response = await fetch("http://localhost:5000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItem),
      });

      // Handle the response
      if (response.ok) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Recipe Added",
          text: "Your recipe has been successfully added!",
          confirmButtonText: "OK",
          confirmButtonColor: "#4CAF50",
        });

        // Reset the form
        reset(); // Reset all fields to their initial values
      } else {
        // Handle errors
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Failed to add the recipe.",
          confirmButtonText: "OK",
          confirmButtonColor: "#F44336",
        });
      }
    } catch (error) {
      // Handle network errors
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server.",
        confirmButtonText: "OK",
        confirmButtonColor: "#F44336",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl bg-hotel-secondary rounded-lg p-8 w-full max-w-2xl lg:max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-center text-hotel-primary mb-8">
          Add New Recipe
        </h2>

        {/* Recipe Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-hotel-primary mb-2"
          >
            Recipe Name
          </label>
          <input
            {...register("name", { required: "Recipe name is required" })}
            type="text"
            id="name"
            placeholder="Enter recipe name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hotel-primary outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-hotel-primary mb-2"
          >
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            id="category"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hotel-primary outline-none"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-lg font-medium text-hotel-primary mb-2"
          >
            Price (USD)
          </label>
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            id="price"
            placeholder="Enter price in USD"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hotel-primary outline-none"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Recipe Details */}
        <div className="mb-8">
          <label
            htmlFor="recipe"
            className="block text-lg font-medium text-hotel-primary mb-2"
          >
            Recipe Details
          </label>
          <textarea
            {...register("recipe", { required: "Recipe details are required" })}
            id="recipe"
            placeholder="Enter detailed recipe instructions"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hotel-primary outline-none h-32 resize-none"
          ></textarea>
          {errors.recipe && (
            <p className="text-red-500 text-sm">{errors.recipe.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-lg font-medium text-hotel-primary mb-2"
          >
            Image URL
          </label>
          <input
            {...register("image", { required: "Image URL is required" })}
            type="url"
            id="image"
            placeholder="Enter the image URL"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hotel-primary outline-none"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-hotel-primary text-white text-lg font-semibold py-4 rounded-lg hover:bg-restaurant-primary transition duration-300"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddItems;
