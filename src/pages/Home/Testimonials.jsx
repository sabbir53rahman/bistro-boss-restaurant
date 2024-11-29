import React from "react";
import Rating from "react-rating-stars-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample testimonials data with images
const testimonials = [
  {
    name: "John Doe",
    review: "This is an amazing service! I'm so happy with the experience.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    review: "Great service, but there's some room for improvement.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Michael Lee",
    review: "Good value for money, but the wait time was long.",
    rating: 3,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const Testimonials = () => {
  // Slick slider settings
  const settings = {
    dots: true, // Show dots for pagination
    infinite: true, // Loop through slides infinitely
    speed: 500,
    slidesToShow: 3, // Default number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides on medium devices
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 1 slide on small devices
        },
      },
    ],
  };

  return (
    <div className="bg-hotel-secondary py-12 overflow-hidden">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <h2 className="text-2xl sm:text-3xl text-hotel-neutral font-bold text-center mb-8">
          Testimonials
        </h2>

        {/* React Slick Slider */}
        <Slider {...settings} className="container mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-hotel-neutral px-4 py-6 shadow-md rounded-md text-center">
                {/* User Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4"
                />

                {/* User Name */}
                <h3 className="text-lg sm:text-xl font-semibold text-hotel-secondary mb-2">
                  {testimonial.name}
                </h3>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {testimonial.review}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center">
                  <Rating
                    count={5}
                    value={testimonial.rating}
                    size={20}
                    activeColor="#C19A6B" // Use the hotel primary color for stars
                    edit={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Testimonials;
