import React from "react";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Provider } from "./helpers/context";
import PageTitle from "../../components/common/PageTitle";
import Toolbar from "../../components/15_view_login_user/Toolbar";
import ModalContainer from "../../components/15_view_login_user/ModalContainer";
//import ViewMessages from "../../components/02_view_views/ViewMessages";
import UserDetails from "../../components/user-profile-lite/UserDetails";
import FormCreate from "../../components/15_view_login_user/form_create/FormCreate";
// import TableList from "../../components/15_view_login_user/table_list/TableList";
// import Footer from "../../components/footer/Footer";

function ViewViews({ usuario }) {
  return (
    <Container fluid className="main-content-container px-5 py-5 mt-5">
      <Row>
        <Col lg="6" md="6" sm="6" className="m-auto">
          <Provider>
            <h5 className="m-0 login-h5 pb-2">Acceso Inmersal</h5>
            <hr
              _ngcontent-kio-c93=""
              class="brand-line text--align-left margin-xs-18--top"
            ></hr>
            <FormCreate />
          </Provider>
        </Col>
        <Col lg="6" md="6" sm="6" className="mt-auto px-5">
          {/* <h5 className="m-0">Acceso administrador</h5> */}
          <div>
            {/* <UserDetails /> */}
            <img
              src="https://res.cloudinary.com/inmersal123/image/upload/v1622151718/website/inmersal_logo_qmtf5i.svg"
              width="310px"
            />
            <p>
              Inmersal es una plataforma interactiva que le permite a las
              constructoras, inmobiliarias y agentes vender sus proyectos
              inmobiliarios en internet centralizando toda la información que un
              prospecto necesita para conocer a fondo el proyecto y empleando
              tecnologías de realidad virtual y 3D.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewViews;
