import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loading from "../Sheard/Loading/Loading";

const LoginRequired = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>;
    }

    if (!user?.email) {
        return <Loading></Loading>;
    }
    else {
        return children;
    }




    return <Navigate state={{ from: location }} to="/" replace />;
};

export default LoginRequired;



