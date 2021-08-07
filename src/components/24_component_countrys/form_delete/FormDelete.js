import React, { useState, useEffect } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/24_view_countrys/helpers/context";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import formDeleteParams from "./form_delete_params";
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
  const [parametrosdeserver, setParametrosDeServer] = useState();
  const { view_global_actions, view_global_state } = React.useContext(Context);
  const icons = Icons();
  const form_params = formDeleteParams(null);


  const { handleSubmit, control, reset } = useForm({ defaultValues: view_global_state.row });

  useEffect(() => {
    const getData = async () => enviarAlServidor(respuestaDeleteOk, respuestaDeleteErr, parametrosdeserver);
    if (!_.isEmpty(parametrosdeserver))
      getData();
  }, [parametrosdeserver])


  const onCancel = () => {
    reset();
    view_global_actions.cancel();
  };

  const onSubmit = () => {
    const data = view_global_state.row
    const parametros = { ...form_params["delete_server"], url: `${form_params.delete_server.url}/${data.id}` };
    setParametrosDeServer(parametros);
  };

  function respuestaDeleteOk(data) {
    console.log(data);
    view_global_actions.deleted()
    showMessage("Registro borrado!", false);
  };

  function respuestaDeleteErr(error) {
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
                      Borrar {ReactHtmlParser(icons.check.icon)}
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
