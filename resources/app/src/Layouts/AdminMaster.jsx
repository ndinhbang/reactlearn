import { Outlet } from "react-router-dom";

const AdminMasterLayout = () => {
    return (
        <div className={`admin-master-layout`}>
            <Outlet />
        </div>
    )
}

export default AdminMasterLayout
