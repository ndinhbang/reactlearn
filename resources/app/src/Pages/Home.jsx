import React from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react-pro'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <Link to={`/auth/login`}>Login</Link>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home
