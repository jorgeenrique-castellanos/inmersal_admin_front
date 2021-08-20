import React, { useState, useEffect } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/26_view_cities/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import { ToastContainer, toast } from "react-toastify";
import { validateFormData } from "../../../helpers/form_validate";
import formCreateParams from "./form_create_params";
import showMessage from "../../../helpers/messages";
import { enviarAlServidor } from "../../../helpers/servidor";
import SelectAsyncPaginate from "../select/selectjs";


import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";

export default function FormCreate() {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState("init");
  const [parametrosdeserver, setParametrosDeServer] = useState();
  const { view_global_actions } = React.useContext(Context);
  const icons = Icons();
  const form_params = formCreateParams(null);

  const [currentcountry, setCurrentCountry] = useState({ value: 1, label: "Audi" });

  useEffect(() => {
    const getData = async () =>
      enviarAlServidor(
        respuestaCreateOk,
        respuestaCreateErr,
        parametrosdeserver
      );
    getData();
  }, [parametrosdeserver]);

  const onCancel = () => {
    reset();
    view_global_actions.cancel();
  };

  const onSubmit = data =>
    validateFormData(
      form_params["validation_rules"],
      data,
      sendToServer,
      viewErrors
    );

  function viewErrors(errors) {
    console.log(errors);
    showMessage("Verifique los datos para guardar los cambios");
    setErrorList(errors);
  }

  const sendToServer = data => {
    data.tag = Math.random;
    const config = { ...form_params["create_server"], data: data };
    console.log("prametros send to server create");
    console.log(config);

    setParametrosDeServer(config);
  };

  function respuestaCreateOk(data) {
    view_global_actions.created();
    showMessage("Registro creado!", false);
  }

  function respuestaCreateErr(error) {
    console.log("respuestaCreateErr");
    console.log(error);
    showMessage(error.data.message);
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
                      id={"code"}
                      name={"code"}
                      labelText={"Codigo"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"123"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <SelectAsyncPaginate
                      value={currentcountry}
                      onChange={(country) => setCurrentCountry(country)}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"state_id"}
                      name={"state_id"}
                      labelText={"Departamento"}
                      required={!false}
                      placeHolder={"Seleccionar departamento"}
                      selectOptions={[
                        { value: "0", label: "Antioquia" },
                        { value: "1", label: "Santander" },
                        { value: "2", label: "Boyacaa" },
                        { value: "3", label: "Cundinamarca" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <InputText
                      register={register}
                      id={"city"}
                      name={"city"}
                      labelText={"Ciudad"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escribir una ciudad"}
                      maxLength={null}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="12" className="form-group">
                    <InputText
                      register={register}
                      id={"status"}
                      name={"status"}
                      labelText={"Estado"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Escribir un estado"}
                      maxLength={null}
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
