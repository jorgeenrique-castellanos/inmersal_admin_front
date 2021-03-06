import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/28_component_identification_types/Toolbar";
import ModalCreateContainer from "../../components/28_component_identification_types/form_create/ModalCreateContainer";
import ModalEditContainer from "../../components/28_component_identification_types/form_edit/ModalEditContainer";
import ModalDeleteContainer from "../../components/28_component_identification_types/form_delete/ModalDeleteContainer";

import FormCreate from "../../components/28_component_identification_types/form_create/FormCreate";
import FormEdit from "../../components/28_component_identification_types/form_edit/FormEdit";
import FormDelete from "../../components/28_component_identification_types/form_delete/FormDelete";
import TableList from "../../components/28_component_identification_types/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Crear tipo de identificación"
          subtitle="Informacion general de crear, modificar y eliminar tipos de identificación"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Datos tipos de identificación</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalCreateContainer
                  title="Crear tipos de identificación"
                  subtitle="Completa la informacion para crear tipo de identificación"
                  body={<FormCreate />}
                  size="lg"
                />
                <ModalEditContainer
                  title="Editar tipos de identificación"
                  subtitle="Modificar la informacion de tipo de identificación"
                  body={<FormEdit />}
                  size="lg"
                />
                <ModalDeleteContainer
                  title="Borrar tipos de identificación"
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
