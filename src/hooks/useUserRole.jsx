import { useQuery } from "react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "../AuthProvider/AuthProvider";

const useUserRole = () => {
    const { axiosSecure } = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: role, isLoading } = useQuery({
        queryKey: ["authorization", user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/get-user-role/${user?.email}`)
                return res?.data?.data?.role
            }
        }
    })
    return { role, isLoading }
};

export default useUserRole;