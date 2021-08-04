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
  // const [open_modal, toggleModal] = useState(false);
  // const { view_global_state } = useContext(Context);

  // useEffect(() => {
  //   view_global_state.state_action === "exit" ? toggleModal(true) : toggleModal(false);
  // }, [view_global_state]);

  return (
    <Container fluid className="main-content-container px-4 position-relative">
      <Row
        className="position-absolute col-lg-12 col-md-12 m-0"
        style={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <Col lg="6" md="12" className="m-auto">
          <Provider>
            <Card className="">
              <CardHeader>
                <PageTitle
                  title="Terminar sesión"
                  subtitle="¿Esta seguro de salir?, De lo contrario dar click en NO"
                  className="text-center mb-1"
                />
              </CardHeader>
              <CardBody className="pt-1 mb-2">
                {/* <Toolbar /> */}
                <ToastContainer />
                <FormCreate />
                {/* <ModalContainer
                  title="Cerrar sesión"
                  subtitle="Compruebe si dejo algun cambio pendiente, de lo contrario oprimir SI para salir"
                  body={<FormCreate />}
                  size="md"
                /> */}
              </CardBody>
            </Card>
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
