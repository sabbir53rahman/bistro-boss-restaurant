import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import useTokenCheck from '../../hooks/useAuthCheck';

const AdminHome = () => {
    useTokenCheck()
  const { isAdmin, isLoading, isError, error } = useAdmin();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome Admin</h1>
      <p>Admin Status: {isAdmin ? "Yes" : "No"}</p>
    </div>
  );
};

export default AdminHome;
