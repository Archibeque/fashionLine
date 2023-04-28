import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'




function ProtectedRoutes({ children, ...rest}) {
    // const user = true
    const user = useSelector((state) => state.user.currentUser);


return (
    <>
    {user ? ( 
        <>
            <Outlet />
        </>

    ): <Navigate to="/login"  /> } 
    </>
    )
  
}

export default ProtectedRoutes