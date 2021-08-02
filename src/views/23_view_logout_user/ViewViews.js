import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button
} from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/23_view_logout_user/Toolbar";
import ModalContainer from "../../components/23_view_logout_user/ModalContainer";
//import ViewMessages from "../../components/02_view_views/ViewMessages";
import FormCreate from "../../components/23_view_logout_user/form_create/FormCreate";
import { Context } from "../../views/23_view_logout_user/helpers/context";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4 position-relative">
      <Row
        className="position-absolute"
        style={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <Col lg="6" md="12" sm="12" className="m-auto">
          <Provider>
            <Card className="">
              <CardHeader>
                <PageTitle
                  title="Información de terminar sesión"
                  subtitle="Al aceptar debera ingresar su usuario y contraseña nuevamente"
                  className="text-center col-lg-12 mb-1 text-lowercase"
                />
              </CardHeader>
              <CardBody className="pt-1 mb-2">
                <Toolbar />
                <ToastContainer />
                <ModalContainer
                  title="Cerrar sesión"
                  subtitle="Compruebe si dejo algun cambio pendiente, de lo contrario oprimir SI para salir"
                  body={<FormCreate />}
                  size="md"
                />
              </CardBody>
            </Card>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
