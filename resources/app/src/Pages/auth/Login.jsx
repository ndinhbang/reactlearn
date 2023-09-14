import React from 'react'
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

const Login = () => {
    return (
        <CCol md={4}>
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <CForm>
                            <h3>Guest Login</h3>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                                <CFormInput placeholder="Email" autoComplete="email" />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                                <CFormInput
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
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
                                        <Link className="btn btn-link px-0" to={`/auth/forgot-password`}>
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

export default Login
