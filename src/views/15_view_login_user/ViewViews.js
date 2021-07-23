import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/15_view_login_user/Toolbar";
import ModalContainer from "../../components/15_view_login_user/ModalContainer";
//import ViewMessages from "../../components/02_view_views/ViewMessages";
import FormCreate from "../../components/15_view_login_user/form_create/FormCreate";
// import TableList from "../../components/15_view_login_user/table_list/TableList";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          // title="Acceso de usuario"
          // subtitle="Panel administrativo de la constructora"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="6" md="6" sm="6" className="m-auto">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header pb-2">
                <h5 className="m-0">Acceso administrador</h5>
                {/* <Toolbar /> */}
              </CardHeader>
              <CardBody className="pt-2">
                <ToastContainer />
                <FormCreate/>
                {/* <ModalContainer
                  title="Información para crear la vista"
                  body={<FormCreate />}
                  size="lg"
                /> */}
                {/* <TableList title={"Vistas activas"} /> */}
              </CardBody>
            </Card>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
