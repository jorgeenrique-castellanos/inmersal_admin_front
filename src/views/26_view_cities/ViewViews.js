import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/26_component_cities/Toolbar";
import ModalCreateContainer from "../../components/26_component_cities/form_create/ModalCreateContainer";
import ModalEditContainer from "../../components/26_component_cities/form_edit/ModalEditContainer";
import ModalDeleteContainer from "../../components/26_component_cities/form_delete/ModalDeleteContainer";

import FormCreate from "../../components/26_component_cities/form_create/FormCreate";
import FormEdit from "../../components/26_component_cities/form_edit/FormEdit";
import FormDelete from "../../components/26_component_cities/form_delete/FormDelete";
import TableList from "../../components/26_component_cities/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Información de ciudades"
          subtitle="Informacion general de crear, modificar y eliminar ciudades"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Datos de la ciudad</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalCreateContainer
                  title="Crear Pais"
                  subtitle="Completa la informacion para crear pais"
                  body={<FormCreate />}
                  size="lg"
                />
                <ModalEditContainer
                  title="Editar Pais"
                  subtitle="Modificar la informacion de pais"
                  body={<FormEdit />}
                  size="lg"
                />
                <ModalDeleteContainer
                  title="Borrar Pais"
                  subtitle=""
                  body={<FormDelete />}
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
