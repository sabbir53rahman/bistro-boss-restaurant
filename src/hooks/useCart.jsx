import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function useCart() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('access-token')

  const { isLoading, refetch, data: cart = [], isError, error } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Prevent fetching if no user is logged in
      // Fetch from the new path parameter-based endpoint
      const res = await fetch(`http://localhost:5000/cart/${user.email}`, {
        headers: {
          authorization: `bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Error fetching cart items");
      return res.json();
    },
    enabled: !!user?.email, // Ensure the query only runs if the user is logged in
  });

  if (isError) {
    console.error("Failed to fetch cart items:", error.message);
  }

  return [cart, refetch, isLoading];
}

export default useCart;
