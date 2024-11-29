import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import InputField from "../ContactUs/InputField";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const RegistrationForm = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { createUser, googleSignIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      const loggedInUser = res.user;
      console.log(loggedInUser);
  
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
  
      axiosPublic.post('/users', saveUser)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error saving the user data!", error);
        });
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Registration form data", formData);

    // sign-up logic here
    createUser(formData.email, formData.password)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);

        const saveUser = { name: formData.name, email: formData.email };

        // Using axiosPublic instance to post data
        axiosPublic
          .post("/users", saveUser)
          .then((response) => {
            const data = response.data;
            if (data.insertedId) {
              // Show Swal success message
              Swal.fire({
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 2000,
              });

              // Reset the form after submission
              setFormData({
                name: "",
                email: "",
                password: "",
              });

              // Navigate to the homepage or other destination
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error during user creation:", error);
      });
  };

  // Animation for form elements
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-hotel-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-hotel-primary mb-2">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and enjoy exclusive benefits!
          </p>
        </div>

        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          {/* Name Input */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              icon="👤"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              icon="📧"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              icon="🔒"
            />
          </motion.div>

          {/* Sign Up Button */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-hotel-primary text-white font-semibold rounded-lg shadow-md hover:bg-hotel-secondary transition duration-300"
            >
              Sign Up
            </button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Social Sign Up Option */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
            >
              <FaGoogle className="pr-[10px] text-[25px] " />
              Sign Up with Google
            </button>
          </motion.div>

          {/* Already have an account */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-hotel-primary hover:text-hotel-secondary font-medium"
              >
                Log in here
              </a>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
