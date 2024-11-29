import React from "react";

function SectionTitle({ heading, subHeading }) {
  return (
    <div className="text-center my-8">
      <h2 className="text-4xl font-bold capitalize text-hotel-primary mb-2">
        {heading}
      </h2>
      {subHeading && (
        <p className="text-lg text-gray-600">
          {subHeading}
        </p>
      )}
      <div className="w-24 h-1 bg-hotel-secondary mx-auto mt-2 mb-4"></div>
    </div>
  );
}

export default SectionTitle;
