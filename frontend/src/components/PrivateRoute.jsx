import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, user } = useSelector(state => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("Please login first!");
    } else if (requiredRole && user?.role !== requiredRole) {
      toast.error("Unauthorized access!");
    }
  }, [token, user, requiredRole]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
