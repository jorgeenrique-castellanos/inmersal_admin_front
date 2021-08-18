import React, { useState, useEffect } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/24_view_countrys/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/v1/InputText";
import { ToastContainer, toast } from "react-toastify";
import { validateFormData } from "../../../helpers/v1/form_validate";
import formEditParams from "./form_edit_params";
import showMessage from "../../../helpers/messages";
import { enviarAlServidor } from "../../../helpers/servidor";


import {
  Form,
  Button,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
} from "shards-react";

export default function FormCreate() {


  const [error_list, setErrorList] = useState('init');
  const [parametrosdeserver, setParametrosDeServer] = useState();
  const { view_global_actions, view_global_state } = React.useContext(Context);
  const icons = Icons();
  const form_params = formEditParams(null);


  const { register, handleSubmit, control, reset } = useForm({ defaultValues: view_global_state.row });

  useEffect(() => {
    const getData = async () => enviarAlServidor(respuestaEditOk, respuestaEditErr, parametrosdeserver);
    if (!_.isEmpty(parametrosdeserver))
      getData();
  }, [parametrosdeserver])


  const onCancel = () => {
    reset();
    view_global_actions.cancel();
  };

  const onSubmit = data => validateFormData(form_params["validation_rules"], data, sendToServer, viewErrors);

  function viewErrors(errors) {
    console.log(errors)
    showMessage("Verifique los datos para guardar los cambios");
    setErrorList(errors);
  }

  const sendToServer = data => {
    data.tag = Math.random;
    const parametros = { ...form_params["edit_server"], method: 'PUT', url: `${form_params.edit_server.url}/${data.id}`, data: data };
    setParametrosDeServer(parametros);
  };

  function respuestaEditOk(data) {
    view_global_actions.edited()
    showMessage("Registro cambiado!", false);
  };

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
