import React from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CForm, CFormInput, CInputGroup, CRow, } from '@coreui/react-pro'

const AdminForgotPassword = () => {
    return (
        <CCol md={6} className="admin-forgot-password">
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <CForm>
                            <h4>Reset your password</h4>
                            <p className="text-medium-emphasis">
                                Enter your email and we'll send you instructions.
                            </p>
                            <CInputGroup className="mb-3">
                                <CFormInput placeholder="Email address" autoComplete="email" />
                            </CInputGroup>
                            <CRow>
                                <CCol xs={12}>
                                    <div className="d-grid col-12 mx-auto">
                                        <CButton color="primary" className="px-4" disabled={true}>
                                            Send
                                        </CButton>
                                    </div>
                                </CCol>
                                <CCol xs={6} className="text-right">
                                    <Link className="btn btn-link px-0 mt-2" to={`/admin/auth/login`}>
                                        Back to login
                                    </Link>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCardGroup>
        </CCol>
    )
}

export default AdminForgotPassword
