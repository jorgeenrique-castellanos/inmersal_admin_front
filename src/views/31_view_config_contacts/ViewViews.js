import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/31_component_config_contacts/Toolbar";
import ModalCreateContainer from "../../components/31_component_config_contacts/form_create/ModalCreateContainer";
import ModalEditContainer from "../../components/31_component_config_contacts/form_edit/ModalEditContainer";
import ModalDeleteContainer from "../../components/31_component_config_contacts/form_delete/ModalDeleteContainer";

import FormCreate from "../../components/31_component_config_contacts/form_create/FormCreate";
import FormEdit from "../../components/31_component_config_contacts/form_edit/FormEdit";
import FormDelete from "../../components/31_component_config_contacts/form_delete/FormDelete";
import TableList from "../../components/31_component_config_contacts/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Crear contactos"
          subtitle="Informacion general de crear, modificar y eliminar contactos"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Datos de contactos</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalCreateContainer
                  title="Crear Contactos"
                  subtitle="Completa la informacion para crear contactos"
                  body={<FormCreate />}
                  size="lg"
                />
                <ModalEditContainer
                  title="Editar Contactos"
                  subtitle="Modificar la informacion de contactos"
                  body={<FormEdit />}
                  size="lg"
                />
                <ModalDeleteContainer
                  title="Borrar contactos"
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
