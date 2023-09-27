import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { getUserInfo } from "@/services/auth.service.js";

export const currentUserLoader = async () => {
    try {
        const {data: user} = await getUserInfo()
        return user
    } catch (err) {
        if (err.response?.status === 401) {
            return redirect('/admin/auth/login')
        }
        throw err;
    }
}

const AdminLayout = () => {
    const user = useLoaderData();
    return (
        <div className={`admin-layout`}>
            <div>Hello, {user.name}</div>
            <Outlet />
        </div>
    )
}

export default AdminLayout
