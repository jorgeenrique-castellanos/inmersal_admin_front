import React from "react";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";

import { Provider } from "./helpers/context";
import ModalContainer from "../../components/23_view_logout_user/ModalContainer";
import FormLogout from "../../components/23_view_logout_user/form_logout/FormLogout";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4 position-relative">
      <Row
        className="position-absolute col-lg-12 col-md-12 m-0"
        style={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <Col lg="6" md="12" className="m-auto">
          <Provider>
            <ToastContainer />                
              <ModalContainer
                title="Cerrar sesión"
                subtitle="Compruebe si dejo algun cambio pendiente, de lo contrario oprimir SI para salir"
                body={<FormLogout />}
                size="md"
              />
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
