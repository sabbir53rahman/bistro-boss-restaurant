import React from "react";
import { FaWifi, FaBed, FaUtensils, FaSwimmingPool } from "react-icons/fa"; // Importing specific icons
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const services = [
  {
    id: 1,
    icon: <FaWifi />, // Using React Icons
    title: "Free Wi-Fi",
    description: "Stay connected with our complimentary high-speed internet.",
  },
  {
    id: 2,
    icon: <FaBed />,
    title: "Luxury Rooms",
    description: "Experience comfort in our elegantly designed luxury rooms.",
  },
  {
    id: 3,
    icon: <FaUtensils />,
    title: "Signature Dishes",
    description: "Savor our chef's special recipes and gourmet meals.",
  },
  {
    id: 4,
    icon: <FaSwimmingPool />,
    title: "Pool Access",
    description: "Enjoy relaxation with exclusive access to our pool area.",
  },
];

const ServicesSection = () => {
  return (
    
    <section className="py-[50px] pb-[100px] bg-hotel-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
      heading={"Our Highlight"}
      />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div className="text-4xl text-hotel-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-hotel-secondary">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
