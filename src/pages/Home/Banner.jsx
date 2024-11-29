import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// Import images
import img1 from '../../assets/home/01.jpg';
import img2 from '../../assets/home/02.jpg';
import img3 from '../../assets/home/03.png';
import img4 from '../../assets/home/04.jpg';
import img5 from '../../assets/home/05.png';
import img6 from '../../assets/home/06.png';

// Array of banner data with dynamic images and text
const bannerData = [
  { image: img1, text: 'Welcome to Slide 1' },
  { image: img2, text: 'Explore Slide 2' },
  { image: img3, text: 'Discover Slide 3' },
  { image: img4, text: 'Enjoy Slide 4' },
  { image: img5, text: 'Slide 5 Awaits' },
  { image: img6, text: 'Final Slide' },
];

function Banner() {
  return (
    <>
      <Carousel
        autoPlay={true}          // Enables autoplay
        infiniteLoop={true}      // Loops the carousel indefinitely
        interval={3000}          // Autoplay interval (3 seconds)
        transitionTime={1000}    // Animation duration (1 second)
        showThumbs={true}       // Hides the thumbnails
        showStatus={false}       // Hides the status indicator
        showIndicators={true}    // Shows pagination dots
        stopOnHover={false}      // Prevents autoplay from stopping when hovering
      >
        {bannerData.map((banner, index) => (
          <div className="relative" key={index}>
            <img src={banner.image} alt={`Banner ${index + 1}`} />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Dynamic Text */}
            
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Banner;
