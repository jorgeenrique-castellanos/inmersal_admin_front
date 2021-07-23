import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/11_view_project_List_Metrics/helpers/context";
import { useForm } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputImage from "../../inputs/inputImage";
// import Columnselect from "../../inputs/inputColumnSelect";
import Servidor from "../../../helpers/servidor";
import { ToastContainer, toast } from "react-toastify";
//import { inicializar, validar } from "../../../helpers/form_validate";
import { validateFormData } from "../../../helpers/form_validate";
import formCreateParams from "./form_create_params";

import {
  Form,
  Button,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
} from "shards-react";

export default function FormCreate() {
  const { register, handleSubmit, reset } = useForm();
  const [error_list, setErrorList] = useState({});
  const { view_global_actions } = React.useContext(Context);
  const icons = Icons();
  const form_params = formCreateParams(null);
  const [archivos, setArchivos] = useState(null);

  // const [startDate, setStartDate] = useState(new Date());
  // let handleColor = time => {
  //   return time.getHours() > 12 ? "text-success" : "text-error";
  // };

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

  // const check =

  return (
    <>
      <ToastContainer />
      <ListGroup flush>
        <ListGroupItem className=" pt-2">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"metric_quantyty"}
                      name={"metric_quantyty"}
                      labelText={"Cantidad"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su cantidad"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"metric_title"}
                      name={"metric_title"}
                      labelText={"Titulo"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese titulo"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"metric_description"}
                      name={"metric_description"}
                      labelText={"Descripción"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese descripción"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"metric_image"}
                      name={"metric_image"}
                      labelText={"Imagen"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre su imagen"
                      archivos={3}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    {/* <Columnselect labelText={"Select Your Hobbies"} /> */}
                  </Col>
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
