import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

function Layout() {
  const location = useLocation();
  console.log(location);
  
  // Check if the path includes 'login' or 'register'
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');
  
  return (
    <div>
      {/* Conditionally render Navbar and Footer based on the path */}
      { !noHeaderFooter && <Navbar /> }
      <Outlet />
      { !noHeaderFooter && <Footer /> }
    </div>
  );
}

export default Layout;
