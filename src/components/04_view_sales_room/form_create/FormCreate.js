import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/04_view_sales_room/views/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputImage from "../../inputs/inputImage";
import InputTextarea from "../../inputs/InputTextarea";
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
        <ListGroupItem className="p-0">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"-view_title"}
                      name={"view_title"}
                      labelText={"Titulo"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Titulo de pestaña"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"view_subtitile"}
                      name={"view_subtitle"}
                      labelText={"Subtitulo"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Subtitulo de pestaña"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <InputTextarea
                      register={register}
                      id={"view_description"}
                      name={"view_description"}
                      labelText={"Descripción "}
                      // required={true}
                      placeholder={"Descripcion de la pestaña"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group m-0">
                    <InputToggle
                      register={register}
                      id={"view_status"}
                      name="view_status"
                      labelText={"Estado"}
                      required={true}
                      small={true}
                      checkStateDefault={true}
                      toggleValues={["Activo", "Inactivo"]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  {/* <Col md="6" className="form-group">
                    
                  </Col> */}
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"view_image"}
                      name="view_image"
                      labelText={"Seleccionar imagen"}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar logo"
                      archivos={3}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-create-footer m-0">
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
