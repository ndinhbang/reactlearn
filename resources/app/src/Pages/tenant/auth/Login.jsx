import React from 'react'
import { CCard, CCardBody, CCardGroup, CCol, } from '@coreui/react-pro'
import LoginForm from "@/Modules/Tenant/Auth/Login/Forms/LoginForm.jsx";
import {formAtom} from "@/Modules/Tenant/Auth/Login/Forms/login.atom.js";

const TenantLogin = () => {
    return (
        <CCol md={4} className="admin-auth-login">
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <LoginForm formAtom={formAtom}/>
                    </CCardBody>
                </CCard>
            </CCardGroup>
        </CCol>
    )
}

export default TenantLogin
