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
import { create } from "zustand";

const useCredentialsStore = create((set) => ({
    username: "",
    password: "",
    setUsername: (username) => set({ username: username }),
    setPassword: (password) => set({ password: password }),
}))


const Login = () => {
    const username = useCredentialsStore((state) => state.username)
    const password = useCredentialsStore((state) => state.password)
    const setUsername = useCredentialsStore((state) => state.setUsername)
    const setPassword = useCredentialsStore((state) => state.setPassword)

    return (
        <CCol md={4}>
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <CForm>
                            <h3>Guest Login</h3>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                                <CFormInput
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="email"
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                                <CFormInput
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
