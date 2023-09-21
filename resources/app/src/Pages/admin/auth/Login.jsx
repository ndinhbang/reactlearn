import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CLoadingButton,
    CRow,
} from '@coreui/react-pro'
import { atom, useAtom } from "jotai";

const defaultValues = {
    username: '',
    password: '',
}

const AdminLogin = () => {
    const valueAtom = useMemo(() => atom(defaultValues), [])
    const [value, setValue] = useAtom(valueAtom)

    const handleChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value })
    }

    return (
        <CCol md={4} className="admin-auth-login">
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <CForm>
                            <h3>Admin Login</h3>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                                <CFormInput placeholder="Email" name={'username'} value={value.username} onChange={handleChange}/>
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                                <CFormInput
                                    type="password"
                                    name={'password'}
                                    value={value.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </CInputGroup>
                            <CRow>
                                <CCol xs={6}>
                                    <CLoadingButton color="primary" className="px-4">
                                        Login
                                    </CLoadingButton>
                                </CCol>
                                <CCol xs={6} className="text-right">
                                    <div className="d-flex justify-content-end">
                                        <Link className="btn btn-link px-0" to={`/admin/auth/forgot-password`}>
                                            Forgot password?
                                        </Link>
                                    </div>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCardGroup>
        </CCol>
    )
}

export default AdminLogin
