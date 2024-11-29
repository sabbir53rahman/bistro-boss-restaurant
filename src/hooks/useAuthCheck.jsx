
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { jwtDecode } from "jwt-decode";

function useTokenCheck() {
  const { logOut } = useContext(AuthContext); // Get the logOut function from context

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    // If no token exists, trigger logOut and redirect to login
    if (!token) {
      handleTokenExpired();
      return;
    }

    try {
      const decodedToken = jwtDecode(token);

      // Check if the token has expired
      const currentTime = Date.now() / 1000; // Get current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token has expired
        handleTokenExpired();
      }
    } catch (error) {
      // If token decoding fails, trigger logOut and redirect to login
      handleTokenExpired();
    }
  }, [logOut]);

  // Function to handle token expiration or invalid token
  const handleTokenExpired = () => {
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      logOut(); // Call logOut from AuthContext
    });
  };
}

export default useTokenCheck;
