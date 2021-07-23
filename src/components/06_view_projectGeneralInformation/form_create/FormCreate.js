import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/06_view_projectGeneralInformation/helpers/context";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../inputs/InputText";
import InputToggle from "../../inputs/InputToggle";
import InputImage from "../../inputs/inputImage";
import InputSelect from "../../inputs/InputSelect";
import InputDatePicker from "../../inputs/inputCalendario";
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
                    <InputText
                      register={register}
                      id={"project_name"}
                      name={"project_name"}
                      labelText={"Nombre"}
                      defaultValue={null}
                      readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su nombre"}
                      maxLength={10}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_description"}
                      name={"project_description"}
                      labelText={"Descripcion"}
                      required={!false}
                      placeHolder={"Seleccionar imagen"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"project_slogan"}
                      name={"project_slogan"}
                      labelText={"Eslogan"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Descripcion del proyecto"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputDatePicker
                      register={register}
                      id={"datepicker_id"}
                      name={"datepicker_id"}
                      labelText={"Fecha"}
                      required={!false}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_stratum"}
                      name="project_stratum"
                      labelText={"Stratum"}
                      required={!false}
                      placeHolder={"Escoger elemento"}
                      defaultValue={stratum[0]}
                      selectOptions={stratum}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_status"}
                      name="project_status"
                      labelText={"Estado del proyecto"}
                      required={!false}
                      placeHolder={"Choose one element"}
                      defaultValue={""}
                      selectOptions={[
                        { value: "enplanos", label: "En planos" },
                        { value: "enconstruccion", label: "En construcción" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_year_built"}
                      name="project_year_built"
                      labelText={"Año de costrucción"}
                      required={!false}
                      placeHolder={"Escoge el elemento"}
                      defaultValue={financiacion[0]}
                      // selectOptions={datos1}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      id={"project_financing_type"}
                      name="project_financing_type"
                      labelText={"Tipo de financiación"}
                      required={!false}
                      placeHolder={"Escoge el elemento"}
                      defaultValue={financiacion[0]}
                      selectOptions={financiacion}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"project_brochure"}
                      name="project_brochure"
                      labelText={"Brochure"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar brochure"
                      archivos={3}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"project_logo"}
                      name="project_logo"
                      labelText={"Logo"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre o haga click para cargar logo"
                      archivos={3}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputToggle
                      register={register}
                      id={"Project_available"}
                      name="project_available"
                      labelText={"Proyecto disponible"}
                      small={true}
                      checkStateDefault={true}
                      toggleValues={["Activo", "Inactivo"]}
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
