import { Navigate, useLocation } from 'react-router-dom';
import useUserRole from "./../hooks/useUserRole"
import { useAuth } from '../AuthProvider/AuthProvider';



const AdminOnly = ({ children }) => {
    const { loading, user } = useAuth()
    const { isLoading, role } = useUserRole()
    console.log(10, "role", role)
    const location = useLocation();
    if (loading) {
        return <h2>LOading</h2>
    }
    if (isLoading) {
        return <h2>LOading</h2>
    }

    if (!user?.email) {
        return <h2>LOading</h2>
    }

    // if (role === "admin") {
    console.log("asdfalsdjfdfasdjldjfsajsdjfaksdj")
    return children;
    // }
    // return children;
    return <Navigate state={{ from: location }} to="/" replace />;
};

export default AdminOnly;