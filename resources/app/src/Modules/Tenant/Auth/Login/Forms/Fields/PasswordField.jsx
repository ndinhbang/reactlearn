import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { selectAtom } from "jotai/utils";
import { CFormInput, CInputGroup } from "@coreui/react-pro";
import PropTypes from 'prop-types';

const PasswordField = ({onChange, formAtom, name}) => {
    const password = useAtomValue(useMemo(() => selectAtom(formAtom, (v) => v[name]), []))
    return (
        <CInputGroup className="mb-4">
            <CFormInput
                type="password"
                name={name}
                value={password}
                placeholder="Password"
                onChange={onChange}
            />
        </CInputGroup>
    )
}

export default PasswordField

PasswordField.propTypes = {
    onChange: PropTypes.func.isRequired,
    formAtom: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
}
