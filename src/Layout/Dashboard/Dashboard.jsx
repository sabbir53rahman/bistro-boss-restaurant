import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import useAdmin from "../../hooks/useAdmin";
import useTokenCheck from "../../hooks/useAuthCheck";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar open/close state
  useTokenCheck()
  //TODO: load data from the server to have dynamic isAdmin based on data

  const {isAdmin} = useAdmin();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 h-full bg-hotel-primary text-white transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          w-64 md:static md:translate-x-0 md:w-64 sm:fixed sm:left-0 sm:top-0 sm:h-screen sm:bg-hotel-primary
        `}
      >
        <div className="flex items-center justify-between p-4">
          {/* Logo and Menu Button */}
          <Link to="/" className="text-2xl font-bold">
            Hotel Dashboard
          </Link>
          <button onClick={toggleDrawer} className="text-2xl md:hidden">
            <AiOutlineClose />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-10">
          <ul>
            {isAdmin ? (
              <>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link to="/dashboard/adminhome" className="flex items-center p-4">
                    <AiOutlineHome className="mr-4 text-2xl" />
                    <span>Admin Home</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/additems"
                    className="flex items-center p-4"
                  >
                    <FaUtensils className="mr-4 text-2xl" />
                    <span>Add Items</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/manage_item"
                    className="flex items-center p-4"
                  >
                    <FaWallet className="mr-4 text-2xl" />
                    <span>Manage Items</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/allusers"
                    className="flex items-center p-4"
                  >
                    <FaUsers className="mr-4 text-2xl" />
                    <span>All Users</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link to="/dashboard/home" className="flex items-center p-4">
                    <AiOutlineHome className="mr-4 text-2xl" />
                    <span>User Home</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/mycart"
                    className="flex items-center p-4"
                  >
                    <FiShoppingCart className="mr-4 text-2xl" />
                    <span>My Carts</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/mycart"
                    className="flex items-center p-4"
                  >
                    <FaWallet className="mr-4 text-2xl" />
                    <span>Payment History</span>
                  </Link>
                </li>
                <li className="hover:bg-hotel-secondary transition-all rounded-md">
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center p-4"
                  >
                    <MdOutlineAccountCircle className="mr-4 text-2xl" />
                    <span>Profile</span>
                  </Link>
                </li>
              </>
            )}

            <div className="divider"></div>

            {/* links for go on main website */}

            <li className="hover:bg-hotel-secondary transition-all rounded-md">
              <Link to="/" className="flex items-center p-4">
                <AiOutlineHome className="mr-4 text-2xl" />
                <span>Home</span>
              </Link>
            </li>
            <li className="hover:bg-hotel-secondary transition-all rounded-md">
              <Link to="/menu" className="flex items-center p-4">
                <BiMenu className="mr-4 text-2xl" />
                <span>Menu</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Header */}
        <div className="bg-white p-6 shadow-md rounded-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold text-hotel-primary">
            Welcome to Your Dashboard
          </h1>
          <button onClick={toggleDrawer} className="text-2xl block md:hidden">
            <AiOutlineMenu />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
