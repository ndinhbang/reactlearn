import { Outlet } from "react-router-dom";

const TenantMasterLayout = () => {
    return (
        <div className={`tenant-master-layout`}>
            <Outlet />
        </div>
    )
}

export default TenantMasterLayout
