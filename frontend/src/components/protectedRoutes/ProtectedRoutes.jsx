import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

const ProtectedRoute = ({ children, isPrivate = true }) => {
  const { userEmail } = useAuth(); // Verificăm dacă utilizatorul este logat
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPrivate && !userEmail) {
      // Dacă utilizatorul nu este logat și ruta este privată, îl redirecționăm către login
      navigate("/login");
    } else if (isPrivate && userEmail) {
      // Dacă utilizatorul este deja logat și încearcă să acceseze o pagină publică, îl redirecționăm
      navigate("/home");
    }
  }, [isPrivate, userEmail, navigate]);

  return children;
};

export default ProtectedRoute;
