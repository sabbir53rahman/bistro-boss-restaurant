import React from "react";
import { motion } from "framer-motion";
import DynamicCover from "../Shared/DynamicCover/DynamicCover";
import banner from "../../assets/home/chef-service.jpg";

// Dummy data for team members (Replace with your actual data)
const teamMembers = [
  { id: 1, name: "John Doe", position: "Executive Chef", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", position: "General Manager", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  {
    id: 3,
    name: "Alice Johnson",
    position: "Marketing Head",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

// Dummy data for client testimonials
const testimonials = [
  { id: 1, name: "Client A", feedback: "The experience was fantastic!", image: "/client1.jpg" },
  { id: 2, name: "Client B", feedback: "Highly recommend their services!", image: "/client2.jpg" },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const AboutUs = () => {
  return (
    <>
      <DynamicCover
        bgImage={banner}
        title={"About us"}
        description={"Learn more about our journey, team, and values."}
      />

      <div className="container mx-auto p-10 ">
        {/* History Section */}
        <motion.div
          className="history-section text-center p-10 bg-gradient-to-r from-hotel-primary to-hotel-secondary text-white rounded-lg shadow-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our History</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Since 2020, we've grown from a small family business to an industry leader. Our passion for hospitality drives everything we do, helping us create memorable experiences for our clients around the world.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="team-section text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h2 className="text-4xl font-bold mb-10 text-hotel-primary">
            Meet Our Team
          </h2>
          <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="team-member bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-hotel-primary"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-hotel-secondary font-light">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          className="core-values-section text-center p-10 bg-white rounded-lg shadow-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-hotel-primary mb-4">Our Core Values</h2>
          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="value-item bg-gray-100 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-hotel-primary mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in honesty and transparency in everything we do.
              </p>
            </motion.div>
            <motion.div
              className="value-item bg-gray-100 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-hotel-primary mb-2">Innovation</h3>
              <p className="text-gray-600">
                We strive to continuously innovate and improve our services.
              </p>
            </motion.div>
            <motion.div
              className="value-item bg-gray-100 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold text-hotel-primary mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to delivering excellence in every aspect of our work.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mission-section bg-white text-center p-10 rounded-lg shadow-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-hotel-primary mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            To create personalized and unforgettable experiences for our guests by combining luxury, comfort, and excellent service with a focus on sustainability and local culture.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="vision-section bg-hotel-secondary text-white text-center p-10 rounded-lg shadow-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            To become a global leader in hospitality by maintaining the highest standards of quality and continuously innovating to meet the needs of our evolving customer base.
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="testimonials-section text-center bg-white p-10 rounded-lg shadow-lg mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h2 className="text-4xl font-bold text-hotel-primary mb-10">
            What Our Clients Say
          </h2>
          <div className="testimonial-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-item p-6 bg-gray-100 rounded-lg shadow-md"
                variants={fadeInUp}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                />
                <p className="text-lg text-gray-600 mb-2">{testimonial.feedback}</p>
                <h3 className="text-xl font-semibold text-hotel-primary">
                  {testimonial.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;
