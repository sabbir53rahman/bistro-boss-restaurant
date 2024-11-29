import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const fetchAdminStatus = async (email) => {
  const token = localStorage.getItem('access-token');
  if (!token) throw new Error('Token not found');

  const decodedToken = jwtDecode(token); // Use the corrected import
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    throw new Error('Token expired');
  }

  const res = await fetch(`http://localhost:5000/users/admin/${email}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
};

function useAdmin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminStatus', user?.email],
    queryFn: () => fetchAdminStatus(user?.email),
    enabled: !!user?.email,
    onError: (error) => {
      if (error.message === 'Token expired') {
        Swal.fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/login');
        });
      }
    },
  });

  const isAdmin = data?.admin || false;

  return { isAdmin, isLoading, isError, error };
}

export default useAdmin;