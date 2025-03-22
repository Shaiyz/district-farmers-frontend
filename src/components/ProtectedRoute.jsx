import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const {user}=useAuth()
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  },[user])

 return token ? children : <Navigate to="/" replace />;
}
