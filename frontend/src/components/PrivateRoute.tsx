import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  requiredRole: "cliente" | "secretaria" | "veterinario";
}

const PrivateRoute = ({ children, requiredRole }: Props) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("rol");

  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
