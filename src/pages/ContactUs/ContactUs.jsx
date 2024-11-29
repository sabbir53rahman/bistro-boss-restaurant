import React, { useState } from "react";
import InputField from "./InputField"; // Import your dynamic input field component
import { motion } from "framer-motion";
import DynamicCover from "../Shared/DynamicCover/DynamicCover";
import banner from "../../assets/contact/banner.jpg";

// Animation for form elements
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactUs = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, phone, message });

    // Add your form submission logic here

    // Reset form fields after submission
    setName("");
    setEmail("");
    setMessage("");
    setPhone("");
  };

  return (
    <>
      <DynamicCover
        bgImage={banner}
        title={"Contact Us"}
        description={"We'd love to hear from you. Get in touch!"}
      />
      <div className="bg-hotel-secondary px-[10px] py-[80px]">
        <motion.div
          className="contact-us-form p-10 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto mt-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.3 }}
        >
          <h2 className="text-4xl text-hotel-primary font-bold mb-6 text-center">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div variants={fadeInUp}>
              <InputField
                label="Your Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                icon="👤"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div variants={fadeInUp}>
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon="📧"
              />
            </motion.div>

            {/* Phone Input */}
            <motion.div variants={fadeInUp}>
              <InputField
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon="📞"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div variants={fadeInUp}>
              <InputField
                label="Message"
                isTextarea={true}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeInUp} className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-hotel-primary font-semibold rounded-lg shadow-md hover:bg-hotel-secondary text-white transition duration-300"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default ContactUs;
