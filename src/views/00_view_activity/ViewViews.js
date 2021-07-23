import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/00_view_activity/Toolbar";
import ModalContainer from "../../components/00_view_activity/ModalContainer";
//import ViewMessages from "../../components/02_view_views/ViewMessages";
import FormCreate from "../../components/00_view_activity/form_create/FormCreate";
import TableList from "../../components/00_view_activity/table_list/TableList";
import Discussions from "../../components/blog/Discussions";
import TopReferrals from "../../components/common/TopReferrals";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Commentations"
          subtitle="sales Customer comment "
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <Provider>
            {/* <ViewMessages /> */}
            <Card>
              <CardHeader className="in-card-view__header">
                <h5 className="m-0">Customer feedback</h5>
                <Toolbar />
              </CardHeader>
              <CardBody>
                <ToastContainer />
                <ModalContainer
                  title="Información para crear la vista"
                  body={<FormCreate />}
                  size="lg"
                />
                {/* <TableList title={"Vistas activas"} /> */}
                <Col>
                  <Row>
                    {/* Discussions */}
                    <Col lg="6" md="12" sm="12" className="mb-4">
                      <Discussions />
                    </Col>
                    {/* Top Referrals */}
                    <Col lg="6" md="12" sm="12" className="mb-4">
                      <TopReferrals />
                    </Col>
                  </Row>
                </Col>
              </CardBody>
            </Card>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
