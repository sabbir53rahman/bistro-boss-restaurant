import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Import cart icon from react-icons
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [cart, loading] = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // Dynamic NavLinks
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Order Food", path: "/order" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  // Calculate total quantity of items in the cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
        navbarBg ? "bg-hotel-secondary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white">
              <img src={logo} alt="" className="w-[25%]" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-white px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:text-hotel-primary"
                  activeClassName="text-hotel-primary"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Shopping Cart Icon with Item Count */}
            <NavLink to="/dashboard/mycart" className="relative">
              <FiShoppingCart className="text-white text-2xl" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                  {totalCartItems}
                </span>
              )}
            </NavLink>

            {/* Conditional Login/Logout or Book Now button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-hotel-primary text-white px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:bg-opacity-80"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-hotel-primary text-white px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:bg-opacity-80"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-hotel-secondary transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ zIndex: -1 }}
      >
        <div className="pt-16 px-6 space-y-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="text-white block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:text-hotel-primary"
              activeClassName="text-hotel-primary"
              onClick={() => setIsOpen(false)} // Close the menu after clicking
            >
              {link.name}
            </NavLink>
          ))}

          {/* Shopping Cart Icon for mobile */}
          <NavLink to="/dashboard/mycart" onClick={() => setIsOpen(false)} className="relative">
            <FiShoppingCart className="text-white text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
                {totalCartItems}
              </span>
            )}
          </NavLink>

          {/* Conditional Login/Logout or Book Now button for mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-hotel-primary text-white block px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:bg-opacity-80"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-hotel-primary text-white block px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ease-in-out hover:bg-opacity-80"
              onClick={() => setIsOpen(false)} // Close the menu after clicking
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
