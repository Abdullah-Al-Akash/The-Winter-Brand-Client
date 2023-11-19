import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "./../hooks/useUserRole";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loading from "../Sheard/Loading/Loading";

const AdminOnly = ({ children }) => {
  const { loading, user } = useAuth();
  const { isLoading, role } = useUserRole();

  const location = useLocation();

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (user?.email && role === "admin") {
    return children;
  }

  return <Navigate state={{ from: location }} to="/" replace />;
};

export default AdminOnly;
