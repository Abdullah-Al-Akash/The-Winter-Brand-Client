import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "./../hooks/useUserRole";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loading from "../Sheard/Loading/Loading";

const AdminOnly = ({ children }) => {
  const { loading, user } = useAuth();
  const { isLoading, role } = useUserRole();
  console.log(10, "role", role);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!user?.email) {
    return <Loading></Loading>;
  }

  // if (role === "admin") {
  console.log("asdfalsdjfdfasdjldjfsajsdjfaksdj");
  return children;
  // }
  // return children;
  return <Navigate state={{ from: location }} to="/" replace />;
};

export default AdminOnly;
