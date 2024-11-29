import React from "react";
import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

function Category() {
  return (
    <>
      <SectionTitle
        subHeading={"From 11.00am to 10.00pm"}
        heading={"Order Online"}
      />
      <div className="flex justify-center pb-[100px] mx-auto">
        <Swiper
          slidesPerView={3} // Default for large screens
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 30 }, // Large devices
            768: { slidesPerView: 2, spaceBetween: 20 }, // Medium devices
            640: { slidesPerView: 1, spaceBetween: 10 }, // Small devices
            320: { slidesPerView: 1, spaceBetween: 10 }, // Extra small devices
          }}
          modules={[Pagination]}
          className="mySwiper w-full max-w-5xl"
        >
          {[slide1, slide2, slide3, slide4, slide5].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative group cursor-pointer">
                <img
                  src={slide}
                  alt={`slide-${index}`}
                  className="w-full h-72 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105 shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
                  <h3 className="text-3xl font-bold uppercase text-white p-4 w-full text-center tracking-wide transition-all duration-300 group-hover:text-yellow-400">
                    {["Salads", "Pizzas", "Soups", "Desserts", "Salads"][index]}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Category;
