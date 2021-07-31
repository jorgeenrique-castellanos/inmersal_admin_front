import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/25_component_states/Toolbar";
import ModalContainer from "../../components/25_component_states/ModalContainer";
import FormCreate from "../../components/25_component_states/form_create/FormCreate";
import TableList from "../../components/25_component_states/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Información del departamento"
          subtitle="Informacion general de crear, modificar y eliminar el departamento"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Datos del departamento</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalContainer
                  title="Crear el departamento"
                  subtitle="Informacion de crear el departamento"
                  body={<FormCreate />}
                  size="lg"
                />
                <TableList title={"Vistas activas"} />
              </CardBody>
            </Card>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
