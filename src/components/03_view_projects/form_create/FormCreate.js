import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/03_view_projects/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputSelect from "../../inputs/InputSelect";
import InputTextarea from "../../inputs/InputTextarea";
import InputRange from "../../inputs/InputRange";
import InputImage from "../../inputs/inputImage";
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
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_empresa"}
                      name="project_empresa"
                      labelText={"Empresa"}
                      required={false}
                      placeHolder={"Choose one element"}
                      selectOptions={[
                        { value: "1", label: "Marval" },
                        { value: "2", label: "Fenix" },
                        { value: "3", label: "Inmersal" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_name_project"}
                      name={"project_name_project"}
                      labelText={"Nombre de proyecto"}
                      defaultValue={null}
                      readOnly={false}
                      required={true}
                      placeHolder={"Ejemplo"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="form-group">
                    <InputTextarea
                      register={register}
                      id={"project_description"}
                      name={"project_description"}
                      labelText={"Descripción del proyecto"}
                      placeHolder={"Escriba su descripción"}
                      required={true}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputTextarea
                      register={register}
                      id={"project_infromation"}
                      name={"project_information"}
                      labelText={"Información del proyecto"}
                      placeHolder={
                        "Ejemplo: Tipo de Apartamentos: Espacios entre 20 m2 y 51 m2 Enfocado en jóvenes en sus primeros empleos"
                      }
                      required={true}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_country"}
                      name="project_country"
                      labelText={"Pais"}
                      required={false}
                      placeHolder={"Seleccionar su Pais"}
                      selectOptions={[
                        { value: "1", label: "Colombia" },
                        { value: "2", label: "Colombia" },
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
                      id={"project_departament"}
                      name="project_departament"
                      labelText={"Departamento"}
                      required={false}
                      placeHolder={"Seleccionar departamento"}
                      selectOptions={[
                        { value: "1", label: "Santander" },
                        { value: "2", label: "Santander" },
                        { value: "3", label: "Santander" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_city"}
                      name="project_city"
                      labelText={"Ciudad"}
                      required={false}
                      placeHolder={"Escoger Ciudad"}
                      selectOptions={[
                        { value: "1", label: "Bucarmanga" },
                        { value: "2", label: "Bucarmanga" },
                        { value: "3", label: "Bucarmanga" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="form-group">
                    <InputRange
                      register={register}
                      id={"project_area"}
                      name={"project_area"}
                      labelText={"Area desde"}
                      optionType={"De"}
                      optionText={"m2"}
                      rangeInitial={45}
                      rangeMin={20}
                      rangeMax={90}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputRange
                      register={register}
                      id={"project_precio"}
                      name={"project_precio"}
                      labelText={"Precios desde"}
                      optionType={"De"}
                      optionText={"Millones COP"}
                      rangeInitial={450}
                      rangeMin={200}
                      rangeMax={900}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                </Row>
                <Row form>
                <Col md="6" className="form-group">
                    <InputImage
                      id={"project_image"}
                      name="project_image"
                      labelText={"Imagen del proyecto"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar imagen"
                      archivos={3}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputToggle
                      register={register}
                      id={"project_state"}
                      name="project_state"
                      labelText={"Estado"}
                      small={true}
                      checkStateDefault={true}
                      toggleValues={["Disponible", "Cancelado"]}
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
                      Guardar Cambios {ReactHtmlParser(icons.check.icon)}
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
