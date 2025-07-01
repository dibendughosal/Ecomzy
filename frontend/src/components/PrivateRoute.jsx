import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, user } = useSelector(state => state.auth);

  if (!token) {
    toast.error("Please login first!");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    toast.error("Unauthorized access!");
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
