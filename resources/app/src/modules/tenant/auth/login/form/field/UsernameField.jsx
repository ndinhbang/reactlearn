import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { selectAtom } from "jotai/utils";
import { CFormInput, CInputGroup } from "@coreui/react-pro";
import PropTypes from 'prop-types';

const UsernameField = ({onChange, formAtom, name}) => {
    const value = useAtomValue(useMemo(() => selectAtom(formAtom, (v) => v[name]), []))
    return (
        <CInputGroup className="mb-3">
            <CFormInput placeholder="Username" name={name} value={value} onChange={onChange}/>
        </CInputGroup>
    )
}

export default UsernameField

UsernameField.propTypes = {
    onChange: PropTypes.func.isRequired,
    formAtom: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
}
