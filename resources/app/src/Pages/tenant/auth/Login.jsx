import React, { useMemo } from 'react'
import { CCard, CCardBody, CCardGroup, CCol, } from '@coreui/react-pro'
import LoginForm from "@/Modules/Tenant/Auth/Login/Forms/LoginForm.jsx";
import { atom } from "jotai";

const defaultValues = {
    username: '',
    password: '',
}

const TenantLogin = () => {
    const formAtom = useMemo(() => atom(defaultValues), [])
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
