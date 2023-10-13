import { Outlet } from "react-router-dom";

const TenantLayout = () => {
    return (
        <div className={`tenant-layout`}>
            <Outlet />
        </div>
    )
}

export default TenantLayout
