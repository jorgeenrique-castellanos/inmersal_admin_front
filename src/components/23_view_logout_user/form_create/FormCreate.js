import React, { useContext } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { enviarAlServidor } from "../../../helpers/servidor";
import { ToastContainer, toast } from "react-toastify";
import formCreateParams from "./form_create_params";
import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";
import AppContext from "../../../components/app_context/general_context";

export default function FormCreate() {
  const { handleSubmit, control } = useForm();
  const form_params = formCreateParams(null);
  const mainContext = useContext(AppContext);

  const test = true;
  let onSubmit = null;
  if (test) {
    onSubmit = () => mainContext.setToken(null);
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

  const onCancel = data => {
    var config = form_params["server_config"];
    config["headers"]["Authorization"] = "Bearer " + mainContext.token;
    enviarAlServidor(loginExitoso, loginErrado, config);
  };

  function showMessage(message, error = true) {
    const config = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    };
    return error
      ? toast.error(message, config)
      : toast.success(message, config);
  }

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
                    className="form-create-footer-login justify-content-center flex-column"
                  >
                    <Button
                      className="btn-text-icon-right mr-2 px-5"
                      pill
                      type="submit"
                    >
                      Esta seguro de salir
                    </Button>

                    <Button pill theme="danger" onClick={onCancel}>
                      Cancel
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
