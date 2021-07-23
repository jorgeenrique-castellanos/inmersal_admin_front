import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/05_view_banner_promotional/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputImage from "../../inputs/inputImage";
// import InputTextarea from "../../inputs/InputTextarea";
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
  const [archivos, setArchivos] = useState(null);

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
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"banner_id"}
                      name={"banner_id"}
                      labelText={"Id"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      // placeHolder={""}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"banner_title"}
                      name={"banner_title"}
                      labelText={"Titulo"}
                      defaultValue={null}
                      readOnly={false}
                      required={!false}
                      placeHolder={"titulo de banner"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <InputImage
                      register={register}
                      id={"banner_imagen"}
                      name="banner_image"
                      labelText={"Imagen"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar logo"
                      archivos={3}
                      // errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"banner_url"}
                      name={"banner_url"}
                      labelText={"Url"}
                      required={!false}
                      placeHolder={"Vinculo de banner"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputToggle
                      register={register}
                      id={"banner_status"}
                      name="banner_status"
                      labelText={"Estado"}
                      small={true}
                      checkStateDefault={true}
                      toggleValues={["Activo", "Inactivo"]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-create-footer">
                    <Button
                      className="btn-text-icon-right mr-2"
                      pill
                      type="submit"
                    >
                      Guardar {ReactHtmlParser(icons.check.icon)}
                    </Button>
                    <Button pill theme="danger" onClick={onCancel}>
                      Cancelar
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
