import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "./../hooks/useUserRole";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loading from "../Sheard/Loading/Loading";

const CustomerOnly = ({ children }) => {
    const { loading, user } = useAuth();
    const { isLoading, role } = useUserRole();
    const location = useLocation();
    // if (loading) {
    //     return <Loading></Loading>;
    // }

    if (!user?.email) {
        return <Loading></Loading>;
    }


    if (isLoading) {
        return <Loading></Loading>;
    }


    if (role === "user") {
        return children;
    }

    return <Navigate state={{ from: location }} to="/" replace />;
};

export default CustomerOnly;


