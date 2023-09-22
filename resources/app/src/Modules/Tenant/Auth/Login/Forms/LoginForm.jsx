import { CCol, CForm, CRow } from "@coreui/react-pro";
import { Link } from "react-router-dom";
import React, { useCallback } from "react";
import UsernameField from "@/Modules/Tenant/Auth/Login/Forms/Fields/UsernameField.jsx";
import PasswordField from "@/Modules/Tenant/Auth/Login/Forms/Fields/PasswordField.jsx";
import { useSetAtom } from "jotai";
import PropTypes from "prop-types";
import LoginButton from "@/Modules/Tenant/Auth/Login/Forms/Actions/LoginButton.jsx";

const LoginForm = ({formAtom}) => {

    const setFormValues = useSetAtom(formAtom)

    const handleChange = useCallback((e) => {
        setFormValues(values => ({...values, [e.target.name]: e.target.value }))
    }, [])

    return (
        <CForm>
            <h3>Tenant Login</h3>
            <p className="text-medium-emphasis">Sign In to your account</p>
            <UsernameField onChange={handleChange} formAtom={formAtom} name={`username`}/>
            <PasswordField onChange={handleChange} formAtom={formAtom} name={`password`}/>
            <CRow>
                <CCol xs={6}>
                    <LoginButton formAtom={formAtom} />
                </CCol>
                <CCol xs={6} className="text-right">
                    <div className="d-flex justify-content-end">
                        <Link className="btn btn-link px-0" to={`/tenant/auth/forgot-password`}>
                            Forgot password?
                        </Link>
                    </div>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default LoginForm;

LoginForm.propTypes = {
    formAtom: PropTypes.object.isRequired,
}
