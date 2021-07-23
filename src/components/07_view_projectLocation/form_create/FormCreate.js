import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/07_view_projectLocation/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputImage from "../../inputs/inputImage";
import InputSelect from "../../inputs/InputSelect";
import InputCheckbox from "../../inputs/InputCheckbox";
import InputRadio from "../../inputs/InputRadio";
// import InputTextarea from "../../inputs/InputTextarea";
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

  const financiacion = [
    { value: "vis", label: "VIS" },
    { value: "novis", label: "No VIS" }
  ];

  const stratum = [
    { value: "NA", label: "NA" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "rural", label: "Rural" },
    { value: "comercial", label: "Comercial" }
  ];

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
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_country"}
                      name="project_country"
                      labelText={"Pais"}
                      required={!false}
                      placeHolder={"Lista de paises"}
                      selectOptions={[
                        { value: "1", label: "Parqueaderos" },
                        { value: "2", label: "Restaurantes" },
                        { value: "3", label: "Cine" },
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_state"}
                      name="project_state"
                      labelText={"Estado"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "1", label: "Parqueaderos" },
                        { value: "2", label: "Restaurantes" },
                        { value: "3", label: "Cine" },
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_city"}
                      name={"project_city"}
                      labelText={"Ciudad"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Lista de ciudades"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_address"}
                      name={"project_address"}
                      labelText={"Dirección"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Dirección"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_lat"}
                      name={"project_lat"}
                      labelText={"Latitud"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Example 2939"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_lng"}
                      name={"project_lng"}
                      labelText={"Longitud"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Example 222"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_key_google_map"}
                      name={"project_key_google_map"}
                      labelText={"Llave mapa google"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Llave"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>    
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"project_pin"}
                      name="project_pin"
                      labelText={"Pin mapa"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar pin"
                      archivos={3}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_weather"}
                      name="project_weather"
                      labelText={"Clima promedio de la zona"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "1", label: "Frio" },
                        { value: "2", label: "Templado" },
                        { value: "0", label: "Calido" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"project_location_video"}
                      name="project_location_video"
                      labelText={"Video panorámico"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar video"
                      archivos={3}
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
