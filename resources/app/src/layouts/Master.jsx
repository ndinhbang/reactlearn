import { Outlet } from "react-router-dom";

const MasterLayout = () => {
    return (
        <div className={`master-layout`}>
            <Outlet />
        </div>
    )
}

export default MasterLayout
