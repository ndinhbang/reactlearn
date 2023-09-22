import React from 'react'
import {
    CCard,
    CCardBody,
    CCol, CCollapse,
    CContainer, CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CNavItem, CNavLink,
    CRow,
} from '@coreui/react-pro'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row">
            <CContainer>
                <CNavbar expand="lg" colorScheme="light" className="bg-light">
                    <CContainer fluid>
                        <CNavbarBrand href="#">Navbar</CNavbarBrand>
                        <CNavbarToggler
                            aria-label="Toggle navigation"
                            aria-expanded={true}
                            onClick={() => {}}
                        />
                        <CCollapse className="navbar-collapse" visible={true}>
                            <CNavbarNav>
                                <CNavItem>
                                    <CNavLink href="#" active>
                                        Home
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="#">Features</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="#">Pricing</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="#" disabled>
                                        Disabled
                                    </CNavLink>
                                </CNavItem>
                            </CNavbarNav>
                        </CCollapse>
                    </CContainer>
                </CNavbar>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <Link to={`/auth/login`}>Guest Login</Link>
                                <Link to={`/admin/auth/login`}>Admin Login</Link>
                                <Link to={`/tenant/auth/login`}>Tenant Login</Link>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home
