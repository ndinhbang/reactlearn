import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const MasterLayout = () => {
    return (
        <Layout
            className={`master-layout`}
            style={{minHeight: '100vh'}}
        >
            <Outlet/>
        </Layout>
    )
}

export default MasterLayout
