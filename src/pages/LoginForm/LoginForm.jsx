import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import InputField from "../ContactUs/InputField"; // Assuming this is your custom InputField component
import { FaGoogle } from "react-icons/fa"; // For Google login icon
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn, googleSignIn } = useContext(AuthContext);

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
      fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate("/");
        });
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(formData.email, formData.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        navigate(from, {replace:true});
      })
      .catch((error) => {
        console.error("Error logging in:", error.message);
        // You can add error handling logic here
      });
  };

  // Animation variants
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
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please login to access your account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {/* Email Input */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              icon="🔒"
            />
          </motion.div>

          {/* Login Button */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-hotel-primary text-white font-semibold rounded-lg shadow-md hover:bg-hotel-secondary transition duration-300"
            >
              Login
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

          {/* Sign Up Link */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-hotel-primary hover:text-hotel-secondary font-medium"
              >
                Sign up here
              </a>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
