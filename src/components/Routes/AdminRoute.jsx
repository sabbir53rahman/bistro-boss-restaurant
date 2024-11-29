import React, { useContext } from 'react'
import  { AuthContext } from '../../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';


function AdminRoute({children}) {
    const {user, loading} = useContext(AuthContext);
    const {isAdmin , isLoading} = useAdmin()
    const location = useLocation()

    if (loading || isLoading) {
        return <progress className='progress w-56'></progress>
    }
  
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>
}

export default AdminRoute