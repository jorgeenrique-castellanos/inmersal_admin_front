import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/16_view_contact/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputImage from "../../inputs/inputImage";
import InputSelect from "../../inputs/InputSelect";
import InputRange from "../../inputs/InputRange";
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
  Badge
} from "shards-react";

export default function FormCreate() {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState({});
  const { view_global_actions } = React.useContext(Context);
  const icons = Icons();
  const form_params = formCreateParams(null);
  const [archivos, setArchivos] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  let handleColor = time => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

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
                      id={"project_contact_id"}
                      name={"project_contact_id"}
                      labelText={"Telefono principal"}
                      required={!false}
                      placeHolder={""}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>  
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_contact_phones"}
                      name={"project_contact_phones"}
                      labelText={"Otros telefonos"}
                      required={!false}
                      placeHolder={"Ingrese el telefono"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>                
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"project_contact_country"}
                      name={"project_contact_country"}
                      labelText={"País"}
                      required={!false}
                      placeHolder={"Seleccionar pais"}
                      selectOptions={[
                        { value: "0", label: "Parqueaderos" },
                        { value: "1", label: "Restaurantes" },
                        { value: "2", label: "Cine" },
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"project_contact_state"}
                      name={"project_contact_state"}
                      labelText={"Estado"}
                      required={!false}
                      placeHolder={"Seleccionar estado"}
                      selectOptions={[
                        { value: "0", label: "Parqueaderos" },
                        { value: "1", label: "Restaurantes" },
                        { value: "2", label: "Cine" },
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"project_contact_city"}
                      name={"project_contact_city"}
                      labelText={"Ciudad"}
                      required={!false}
                      placeHolder={"Seleccionar ciudad"}
                      selectOptions={[
                        { value: "0", label: "Parqueaderos" },
                        { value: "1", label: "Restaurantes" },
                        { value: "2", label: "Cine" },
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_contact_address"}
                      name={"project_contact_address"}
                      labelText={"Dirección"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su dirección"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>  
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_contact_email"}
                      name={"project_contact_email"}
                      labelText={"Correo electronico"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su Email"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
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
