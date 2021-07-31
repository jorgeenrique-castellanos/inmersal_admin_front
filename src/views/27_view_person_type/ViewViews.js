import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/27_component_person_type/Toolbar";
import ModalContainer from "../../components/27_component_person_type/ModalContainer";
//import ViewMessages from "../../components/02_view_views/ViewMessages";
import FormCreate from "../../components/27_component_person_type/form_create/FormCreate";
import TableList from "../../components/27_component_person_type/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Crear tipo de persona"
          subtitle="Informacion general de crear, modificar y eliminar tipos de persona"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>            
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Datos tipo de persona</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalContainer
                  title="Crear tipo de persona"
                  subtitle="Informacion general de crear de tipo de persona"
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
