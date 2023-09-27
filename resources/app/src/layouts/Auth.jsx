import { Outlet } from "react-router-dom";
import { CContainer, CRow } from "@coreui/react-pro";
import React from "react";

const AuthLayout = () => {
    return (
        <div className="auth-layout bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <Outlet />
                </CRow>
            </CContainer>
        </div>
    )
}

export default AuthLayout
