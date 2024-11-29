import React from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";

const DynamicCover = ({ bgImage, title, description }) => {
  return (
    <Parallax
      bgImage={bgImage}
      bgImageAlt="cover image"
      strength={300}
      blur={{ min: -50, max: 50 }}
      className="w-full h-[35vh] sm:h-[60vh] flex justify-center items-center"
    >
      <div className="flex justify-center items-center h-full w-full">
        {/* Content Container */}
        <div className="py-[200px]">
          <div className="relative bg-black bg-opacity-60 text-white text-center p-8 rounded-lg lg:w-[900px] lg:h-[300px] mx-auto flex flex-col justify-center items-center">
            {/* Title and Description with Framer Motion */}
            <motion.h1
              className="uppercase z-10 text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="capitalize z-10 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default DynamicCover;
