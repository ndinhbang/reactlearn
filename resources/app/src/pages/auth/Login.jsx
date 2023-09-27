import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { login } from "@/services/auth.service.js";
import { createTrackedSelector } from "react-tracked";

const useCredentialsStore = create((set, get) => ({
    username: "",
    password: "",
    setUsername: (username) => set({ username: username }),
    setPassword: (password) => set({ password: password }),
    login: async () => {
        const {data } = await login({
            username: get().username,
            password: get().password
        })
        sessionStorage.setItem('access_token', data.access_token)
    },
}))

const useTrackedCredentialsStore = createTrackedSelector(useCredentialsStore);

const UsernameField = () => {
    const state = useTrackedCredentialsStore();
    return (
        <CInputGroup className="mb-3">
            <CFormInput
                placeholder="Username"
                value={state.username}
                onChange={(e) => state.setUsername(e.target.value)}
                autoComplete="email"
            />
        </CInputGroup>
    )
}

const PasswordField = () => {
    const state = useTrackedCredentialsStore();
    return (
        <CInputGroup className="mb-4">
            <CFormInput
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={(e) => state.setPassword(e.target.value)}
                autoComplete="current-password"
            />
        </CInputGroup>
    )
}

const LoginButton = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const login = useCredentialsStore((state) => state.login)
    const handleSubmit = useCallback(async (e) => {
        setLoading(true)
        try {
            await login()
            navigate('/tenant/dashboard')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <CLoadingButton color="primary" className="px-4" onClick={handleSubmit} loading={loading}>
            Login
        </CLoadingButton>
    )
}



const Login = () => {
    return (
        <CCol md={4}>
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        <CForm>
                            <h3>Guest Login</h3>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <UsernameField />
                            <PasswordField />
                            <CRow>
                                <CCol xs={6}>
                                    <LoginButton />
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
