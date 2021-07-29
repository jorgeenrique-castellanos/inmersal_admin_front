import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

// import MainNavbar from "../components/navigation/main_navbar/MainNavbar";
// import MainSidebar from "../components/navigation/main_sidebar/MainSidebar";
// import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
// import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import Footer from "../components/footer/Footer";

const Login = ({ children, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content m-auto p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {children}
        <div className="pt-5">{!noFooter && <Footer />}</div>
      </Col>
    </Row>
  </Container>
);

export default Login;
