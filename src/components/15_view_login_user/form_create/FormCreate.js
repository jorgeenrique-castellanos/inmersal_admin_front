import React, { useState, useContext } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/15_view_login_user/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputPassword from "../../inputs/InputPassword";
import InputCheckbox from "../../inputs/InputCheckbox";
// import Servidor from "../../../helpers/servidor";
import Servidor, { enviarAlServidor } from "../../../helpers/servidor";
import { ToastContainer, toast } from "react-toastify";
import { validateFormData } from "../../../helpers/form_validate";
import formCreateParams from "./form_create_params";
import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";
import AppContext from "../../../components/app_context/general_context";

export default function FormCreate() {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState({});
  const { view_global_actions } = React.useContext(Context);
  const icons = Icons();
  const form_params = formCreateParams(null);
  const mainContext = useContext(AppContext);

  const onSubmit = data => {
    validateFormData(form_params, data, processValidation);
  };

  const processValidation = result => {
    result.error ? viewErrors(result) : sendToServer(result.data);
  };

  function viewErrors(result) {
    showMessage("Usuario y/o password errado");
    setErrorList(result.data);
  }

  var sendToServer = null;
  const test = true;
  if (test) {
    sendToServer = data => mainContext.setToken("data.data.access_token");
  } else {
    sendToServer = data => {
      var config = form_params["server_config"];
      config["data"] = data;
      enviarAlServidor(loginExitoso, loginErrado, config);
    };
  }

  const loginExitoso = data => {
    mainContext.setToken(data.data.access_token);
  };

  const loginErrado = data => {
    const error = _.get(data, "message", "Error: consulte administrador");
    showMessage(error, true);
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
                    className="form-group d-flex align-items-center pt-5"
                  >
                    {ReactHtmlParser(icons.userline.icon)}
                    <InputText
                      register={register}
                      id={"email"}
                      name={"email"}
                      // labelText={"Email"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escriba su email"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group d-flex align-items-center">
                    {ReactHtmlParser(icons.lockline.icon)}
                    <InputPassword
                      register={register}
                      id={"password"}
                      name={"password"}
                      // labelText={"Contraseña"}
                      required={true}
                      placeHolder={"Escriba la contraseña"}
                      maxLength={null}
                      information={"Escriba el password!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <a href="#ayuda" className="">
                      ¿Necesitas ayuda para ingresar?
                    </a>
                  </Col>
                  <Col md="12" className="form-group">
                    <InputCheckbox
                      id={"check"}
                      name={"kevin"}
                      // labelText={"Seleccionar"}
                      checkboxOptionsInit={[
                        { value: false, label: "Recordar mi nombre de usuario" }
                      ]}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col
                    md="12"
                    className="form-create-footer-login justify-content-center flex-column"
                  >
                    <Button className="p-3 buttonlogin" block type="submit">
                      Ingresar
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
