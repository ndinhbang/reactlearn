import React, { useCallback, useMemo } from 'react'
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
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";

const defaultValues = {
    username: '',
    password: '',
}

const valueAtom = atom(defaultValues);

const UsernameField = ({onChange}) => {
    const username = useAtomValue(useMemo(() => selectAtom(valueAtom, (v) => v.username), []))
    return (
        <CInputGroup className="mb-3">
            <CFormInput placeholder="Username" name={'username'} value={username} onChange={onChange}/>
        </CInputGroup>
    )
}

const PasswordField = ({onChange}) => {
    const password = useAtomValue(useMemo(() => selectAtom(valueAtom, (v) => v.password), []))
    return (
        <CInputGroup className="mb-4">
            <CFormInput
                type="password"
                name={'password'}
                value={password}
                placeholder="Password"
                onChange={onChange}
            />
        </CInputGroup>
    )
}

const AdminLogin = () => {
    const setValue = useSetAtom(valueAtom)

    const handleChange = useCallback((e) => {
        setValue(value => ({...value, [e.target.name]: e.target.value }))
    }, [])

    return (
        <CCol md={4} className="admin-auth-login">
            <CCardGroup>
                <CCard className="p-2">
                    <CCardBody>
                        {/*<CForm>*/}
                            <h3>Admin Login</h3>
                            <p className="text-medium-emphasis">Sign In to your account</p>
                            <UsernameField onChange={handleChange}/>
                            <PasswordField onChange={handleChange}/>
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
                        {/*</CForm>*/}
                    </CCardBody>
                </CCard>
            </CCardGroup>
        </CCol>
    )
}

export default AdminLogin
