import React, { useState } from "react";
import _ from "lodash";
import { DefaultLayout } from "../../../layouts/";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/15_view_login_user/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputPassword from "../../inputs/InputPassword";

import Servidor from "../../../helpers/servidor";
import { ToastContainer, toast } from "react-toastify";
//import { inicializar, validar } from "../../../helpers/form_validate";
import { validateFormData } from "../../../helpers/form_validate";
import formCreateParams from "./form_create_params";

import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";

export default function FormCreate() {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState({});
  const { view_global_actions } = React.useContext(Context);
  const icons = Icons();
  const form_params = formCreateParams(null);

  /*****************    Begin Select  ***********************/
  // React.useEffect(() => {
  //   register("parent_id");
  // }, [register]);

  /*****************    End Select  ***********************/

  const onCancel = () => {
    reset();
    view_global_actions.cancel();
  };

  const onSubmit = data => {
    console.log(data);
    validateFormData(form_params, data, processValidation);
  };

  const processValidation = result => {
    console.log(result);
    result.error ? viewErrors(result) : sendToServer(result.data);
  };

  function viewErrors(result) {
    showMessage("Verifique los datos para guardar los cambios");
    setErrorList(result.data);
  }

  const sendToServer = data => {
    const formData = new FormData();
    const newdata = JSON.stringify(data);
    const config = form_params["record_config"];
    formData.append("data", newdata);
    config["data"] = formData;
    Servidor(responseFromServer, config);
  };

  function responseFromServer(response) {
    const status = _.get(response, "data.status", "Error");
    return status === "Success" ? recordCreated() : recordWrong(response.data);
  }

  const recordCreated = () => {
    view_global_actions.ok();
    showMessage("Registro creado!", false);
  };

  const recordWrong = data => {
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
                  <Col md="12" className="form-group">
                    <InputText
                      register={register}
                      id={"login_user"}
                      name={"login_user"}
                      labelText={"Ingrese su usuario"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"inmersal"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <InputPassword
                      register={register}
                      id={"login_password"}
                      name={"login_password"}
                      labelText={"Ingrese su contraseña"}
                      required={true}
                      placeHolder={"@#$%&1234"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col
                    md="12"
                    className="form-create-footer-login justify-content-center flex-column"
                  >
                    {/* <Col md="6" className="form-group">
                      <a
                        href="http://localhost:3000/blog-overview"
                        className="py-3 btn-text-icon-right mr-2 px-5"
                        pill
                      >
                        Ingresar
                      </a>
                    </Col> */}
                    <Button
                      className="btn-text-icon-right mr-2 px-5"
                      pill
                      type="submit"
                    >
                      Ingresar
                    </Button>
                    {/* {ReactHtmlParser(icons.check.icon)} */}
                    {/* <Button pill theme="danger" onClick={onCancel}>
                      Cancel
                    </Button> */}
                  </Col>
                  <Col md="12" className="form-group my-3 text-center">
                    <Row>
                      <Col md="6" className="form-group">
                        <a href="#olvidar" className="py-3">
                          Olvido su contraseña
                        </a>
                      </Col>
                      <Col md="6" className="form-group">
                        <a href="#registro" className="py-3">
                          registrarse
                        </a>
                      </Col>
                    </Row>
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
