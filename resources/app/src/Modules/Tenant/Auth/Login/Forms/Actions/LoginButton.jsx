import { useNavigate } from "react-router-dom";
import { atom, useAtom, useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import { login } from "@/services/auth.service.js";
import { CLoadingButton } from "@coreui/react-pro";
import PropTypes from "prop-types";

const LoginButton = ({onSuccess, onError, formAtom}) => {
    const navigate = useNavigate();
    const credentials = useAtomValue(formAtom)
    const loadingAtom = useMemo(() => atom(false), [])
    const [loading, setLoading] = useAtom(loadingAtom)

    const handleSubmit = useCallback(async (e) => {
        setLoading(true)
        try {
            const {data } = await login(credentials)
            sessionStorage.setItem('access_token', data.access_token)
            navigate('/tenant/dashboard')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [credentials])
    return (
        <CLoadingButton color="primary" className="px-4" onClick={handleSubmit} loading={loading}>
            Login
        </CLoadingButton>
    )
}

export default LoginButton

LoginButton.propTypes = {
    onSuccess: PropTypes.func,
    formAtom: PropTypes.object.isRequired,
    onError: PropTypes.func,
}
