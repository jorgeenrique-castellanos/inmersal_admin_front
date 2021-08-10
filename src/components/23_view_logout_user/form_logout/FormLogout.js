import React, { useContext } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { enviarAlServidor } from "../../../helpers/servidor";
import { ToastContainer, toast } from "react-toastify";
import formCreateParams from "./form_create_params";
import ModalContainer from "../ModalContainer";
import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";
import AppContext from "../../app_context/general_context";
import { Context } from "../../../views/23_view_logout_user/helpers/context";
import showMessage from "../../../helpers/messages";

export default function FormCreate() {
  const { handleSubmit, control } = useForm();
  const form_params = formCreateParams(null);
  const mainContext = useContext(AppContext);
  const { view_global_actions, view_global_state } = useContext(Context);

  const test = true;
  let onSubmit = null;
  if (test) {
    onSubmit = () => {
      mainContext.setToken(null);
      view_global_actions.cancel();
    };
  } else {
    onSubmit = () => {
      var config = form_params["server_config"];
      config["method"] = "get";
      config["headers"]["Authorization"] = "Bearer " + mainContext.token;
      enviarAlServidor(loginExitoso, loginErrado, config);
    };
  }

  const loginExitoso = data => {
    mainContext.setToken(null);
  };

  const loginErrado = data => {
    const error = _.get(data, "message", "Error: consulte administrador");
    showMessage(error, true);
  };

  let onCancel = data => {
    view_global_actions.cancel();
  };

  return (
    <>
      <ToastContainer />
      <ListGroup flush>
        <ListGroupItem className="p-0 pt-3">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col
                    md="12"
                    className="form-create-footer-login justify-content-center p-0 "
                  >
                    <Button
                      className="btn-text-icon-right mr-2 px-5"
                      pill
                      type="submit"
                    >
                      Si
                    </Button>
                    <Button
                      className="btn-text-icon-right px-5"
                      pill
                      theme="danger"
                      href="http://localhost:3000/blog-overview"
                      onClick={onCancel}
                    >
                      No
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}
