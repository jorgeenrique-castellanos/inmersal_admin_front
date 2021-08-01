import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/31_view_config_contacts/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
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

  const [startDate, setStartDate] = useState(new Date());
  let handleColor = time => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

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
        <ListGroupItem className=" pt-2">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                  <Col md="12" className="form-group">
                    <InputText
                      register={register}
                      id={"name"}
                      name={"name"}
                      labelText={"Nombre"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escriba un nombre"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"country_id"}
                      name={"country_id"}
                      labelText={"Pais"}
                      required={!false}
                      placeHolder={"Seleccionar Pais"}
                      selectOptions={[
                        { value: "0", label: "España" },
                        { value: "1", label: "E.E.U.U" },
                        { value: "2", label: "Francia" },
                        { value: "3", label: "Colombia" }
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
                      id={"person_type_id"}
                      name={"person_type_id"}
                      labelText={"Tipo de persona"}
                      required={!false}
                      placeHolder={"Seleccionar tipo"}
                      selectOptions={[
                        { value: "0", label: "Juridica" },
                        { value: "1", label: "Natural" }
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
                      id={"identification_type_id"}
                      name={"identification_type_id"}
                      labelText={"Tipo de identificación"}
                      required={!false}
                      placeHolder={"Seleccionar tipo"}
                      selectOptions={[
                        { value: "0", label: "Cedula" },
                        { value: "1", label: "Pasaporte" },
                        { value: "2", label: "Cedula extranjera" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"identification"}
                      name={"identification"}
                      labelText={"Identificación"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escriba su identificación"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"client_id"}
                      name={"client_id"}
                      labelText={"Cliente"}
                      required={!false}
                      placeHolder={"Seleccionar tipo"}
                      selectOptions={[
                        { value: "0", label: "Marval" },
                        { value: "1", label: "Fenix" },
                        { value: "2", label: "Otro" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"phone"}
                      name={"phone"}
                      labelText={"Telefono"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escriba un telefono"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"email"}
                      name={"email"}
                      labelText={"Email"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escriba un Email"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"status"}
                      name={"status"}
                      labelText={"Estado"}
                      required={!false}
                      placeHolder={"Seleccionar estado"}
                      selectOptions={[
                        { value: "0", label: "Activo" },
                        { value: "1", label: "Inactivo" }
                      ]}
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
                      Crear{ReactHtmlParser(icons.check.icon)}
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
