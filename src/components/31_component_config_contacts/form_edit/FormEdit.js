import React, { useState, useEffect } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/31_view_config_contacts/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/v1/InputText";
import InputSelect from "../../inputs/InputSelect";
import { ToastContainer, toast } from "react-toastify";
import { validateFormData } from "../../../helpers/v1/form_validate";
import formEditParams from "./form_edit_params";
import showMessage from "../../../helpers/messages";
import { enviarAlServidor } from "../../../helpers/servidor";

import { Form, Button, Row, Col, ListGroupItem, ListGroup } from "shards-react";

export default function FormCreate() {
  const [error_list, setErrorList] = useState("init");
  const [parametrosdeserver, setParametrosDeServer] = useState();
  const { view_global_actions, view_global_state } = React.useContext(Context);
  const icons = Icons();
  const form_params = formEditParams(null);
  console.log(form_params.validation_rules);

  let x = {};
  // fetch("https://inmersal-back.lopublicaste.co/public/api/pais")
  //   .then(response => response.json())
  //   .then(commits => {
  //     x = commits.data.map(datos => {
  //       return datos.country;
  //     }).join();
  //     console.log(x);
  //   });

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: view_global_state.row
  });

  useEffect(() => {
    const getData = async () =>
      enviarAlServidor(respuestaEditOk, respuestaEditErr, parametrosdeserver);
    if (!_.isEmpty(parametrosdeserver)) getData();
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
    const parametros = {
      ...form_params["edit_server"],
      method: "PUT",
      url: `${form_params.edit_server.url}/${data.id}`,
      data: data
    };
    setParametrosDeServer(parametros);
  };

  function respuestaEditOk(data) {
    view_global_actions.edited();
    showMessage("Registro cambiado!", false);
  }

  function respuestaEditErr(error) {
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
