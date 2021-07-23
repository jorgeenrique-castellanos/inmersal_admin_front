import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/03_view_projects/Toolbar";
import ModalContainer from "../../components/03_view_projects/ModalContainer";
// import ViewMessages from "../../components/02_view_views/ViewMessages";
import FormCreate from "../../components/03_view_projects/form_create/FormCreate";
import TableList from "../../components/03_view_projects/table_list/TableList";

function ViewViews(xxx) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Views"
          subtitle="Sales room"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Active Users</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalContainer
                  title="Información para crear la vista"
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
