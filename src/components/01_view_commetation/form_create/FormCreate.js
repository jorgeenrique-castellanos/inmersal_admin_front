import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/01_view_commetation/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputSelect from "../../inputs/InputSelect";
import InputTextarea from "../../inputs/InputTextarea";
import InputCheckbox from "../../inputs/InputCheckbox";
// import Selector from "../../../componentes/select";
// import LpInput from "../../../componentes/input";
// import CheckOne from "../../../componentes/checkone";
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
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"a0"}
                      name={"customer_name"}
                      labelText={"CustomerName"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Pepito Perez"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"a1"}
                      name={"customer_phone"}
                      labelText={"Phone"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"example 32100011.."}
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
                      id={"aaberty"}
                      name={"description"}
                      labelText={"Description of the problem"}
                      required={true}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"a2"}
                      name={"customer_city"}
                      labelText={"City"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Example Bogota"}
                      maxLength={10}
                      information={"information here"}
                      errorList={error_list}
                    />
                  </Col>
                  {/* <Col md="6" className="form-group">
                    
                  </Col> */}
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"inputSelect"}
                      name="select_score"
                      labelText={"Select score"}
                      required={false}
                      placeHolder={"Choose a score"}
                      selectOptions={[
                        { value: "one", label: "1" },
                        { value: "two", label: "2" },
                        { value: "three", label: "3" },
                        { value: "four", label: "4" },
                        { value: "five", label: "5" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputCheckbox
                    id={"check"}
                    labelText={"Seleccionar"}
                    checkboxOptionsInit={[
                      { value: false, label: "red" },
                      { value: false, label: "blue" },
                      { value: false, label: "green" }
                    ]}
                    name={"kevin"}
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
                      Save Changes {ReactHtmlParser(icons.check.icon)}
                    </Button>
                    <Button pill theme="danger" onClick={onCancel}>
                      Cancel
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
