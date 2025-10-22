import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function ProtectedRoute({loginData, children}) {
if(sessionStorage.getItem('token')||loginData) return children;
else return(
    <>
<Navigate to="/home" />
 {toast.success("you must log in first !")};
 </>
)
}

