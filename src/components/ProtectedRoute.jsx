import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const {user, loading}=useAuth()
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!loading && !user){
      navigate('/')
    }
  },[user,loading,navigate])
  
  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

 return user ? children : <Navigate to="/" replace />;
}
