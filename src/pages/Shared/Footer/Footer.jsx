import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hotel-primary text-white py-12">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-200">
            Welcome to [Hotel Name], where luxury meets comfort. We provide a wide range of amenities to make your stay unforgettable, from elegant rooms to signature dining experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link to="/menu" className="text-gray-300 hover:text-white transition-colors duration-300">
                Restaurant
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+1 234 567 890</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>info@hotelname.com</span>
            </li>
            <li>
              <p>123 Luxury Ave, Suite 456, City, Country</p>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="bg-white text-hotel-primary p-3 rounded-full hover:bg-hotel-secondary transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="bg-white text-hotel-primary p-3 rounded-full hover:bg-hotel-secondary transition-colors duration-300">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="bg-white text-hotel-primary p-3 rounded-full hover:bg-hotel-secondary transition-colors duration-300">
              <FaTwitter />
            </a>
          </div>

          {/* Newsletter */}
          <h4 className="text-lg font-medium mb-2">Subscribe to Our Newsletter</h4>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full py-2 px-4 rounded-md text-hotel-primary focus:outline-none"
            />
            <button type="submit" className="bg-hotel-secondary py-2 px-4 rounded-md hover:bg-hotel-primary-light transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-hotel-secondary text-center py-4 mt-8">
        <p className="text-gray-200 text-sm">
          &copy; {new Date().getFullYear()} [Hotel Name]. All Rights Reserved. | Designed by YourCompanyName
        </p>
      </div>
    </footer>
  );
};

export default Footer;
