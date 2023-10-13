import { Outlet } from "react-router-dom";
import React from "react";
import { Layout } from "antd";

const {Header, Content, Footer, Sider} = Layout;

const AuthLayout = () => {
    return (
        <Content>
            <Outlet/>
        </Content>
    )
}

export default AuthLayout
