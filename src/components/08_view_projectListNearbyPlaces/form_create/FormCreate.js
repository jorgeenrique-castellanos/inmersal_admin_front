import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/08_view_projectListNearbyPLaces/helpers/context";
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
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"nearby_place_category"}
                      name={"nearby_place_category"}
                      labelText={"Categoria"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "0", label: "Lista de categorias" },
                        { value: "0", label: "Lista de categorias" }
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"nearby_place_name"}
                      name={"nearby_place_name"}
                      labelText={"Nombre"}
                      required={!false}
                      placeHolder={"Ingrese el nombre"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"nearby_place_address"}
                      name={"nearby_place_address"}
                      labelText={"Dirección"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese direccion"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"nearby_place_lat"}
                      name={"nearby_place_lat"}
                      labelText={"Latitud"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese latitud"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputText
                      register={register}
                      id={"nearby_place_lng"}
                      name={"nearby_place_lng"}
                      labelText={"longitud"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese longitud"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputImage
                      id={"nearby_place_photo"}
                      name="nearby_place_photo"
                      labelText={"Fotografia"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre su fotografia"
                      archivos={3}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <InputText
                      register={register}
                      id={"nearby_place_route"}
                      name={"nearby_place_route"}
                      labelText={"Ruta"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su ruta"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputRange
                      register={register}
                      id={"nearby_place_estimated_time"}
                      name={"nearby_place_estimated_time"}
                      labelText={"Tiempo estimado"}
                      optionType={'Tiempo'}
                      optionText={'Dias'}
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
                      id={"nearby_place_distance"}
                      name={"nearby_place_distance"}
                      labelText={"Distancia estimada"}
                      optionType={'Distancia'}
                      optionText={'Km'}
                      rangeInitial={450}
                      rangeMin={200}
                      rangeMax={900}
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
