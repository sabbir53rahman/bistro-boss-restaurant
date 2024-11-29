import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import room from "../../assets/home/room.jpeg";
import food from "../../assets/home/Food.jpeg";
import Pool from "../../assets/home/Pool.jpeg";
import Ambiance from "../../assets/home/Ambiance.jpeg";

// Sample images for the carousel
const featuredItems = [
  {
    id: 1,
    image: room,
    title: "Luxury Room",
    description: "Relax in our beautifully decorated luxury room.",
  },
  {
    id: 2,
    image: food,
    title: "Signature Dishes",
    description: "Taste the finest gourmet meals prepared by our chef.",
  },
  {
    id: 3,
    image: Pool,
    title: "Relaxing Pool Area",
    description: "Enjoy a refreshing dip in our exclusive pool.",
  },
  {
    id: 4,
    image: Ambiance,
    title: "Cozy Restaurant Ambiance",
    description: "Dine in a cozy atmosphere with delightful decor.",
  },
];

const FeaturedSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hides arrows for mobile-friendliness
  };

  return (
    <section className="py-12 md:py-16 bg-hotel-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 md:mb-8">
          Featured Highlights
        </h2>
        <Slider {...settings}>
          {featuredItems.map((item) => (
            <div key={item.id} className="relative">
              {/* Responsive image height */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-[30rem] object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-lg p-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white mt-2 text-center">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedSection;
