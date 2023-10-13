import { Outlet } from "react-router-dom";
import { CContainer } from "@coreui/react-pro";

const SampleMasterLayout = () => {
    return (
        <CContainer className={`sample-master-layout`}>
            <Outlet />
        </CContainer>
    )
}

export default SampleMasterLayout
