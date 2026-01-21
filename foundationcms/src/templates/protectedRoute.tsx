import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

interface SessionResponse {
  authenticated: boolean;
  userId?: string;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/session", {
        method: 'GET',
        credentials: 'include',
      });
      const data: SessionResponse = await response.json();
      console.log(data);

      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.log("Error checking session:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []); 

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


    //const isAuthenticated = sessionStorage;//sessionStorage.getItem('authToken');
  




