import React, { useState } from "react";
import _ from "lodash";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icons from "../../../assets/icons";
import { Context } from "../../../views/15_view_project_center_multimedia/helpers/context";
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
                    <InputText
                      register={register}
                      id={"property_title"}
                      name={"property_title"}
                      labelText={"Titulo"}
                      required={!false}
                      placeHolder={"Ingrese el titulo"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_description"}
                      name={"property_description"}
                      labelText={"Tipo"}
                      required={!false}
                      placeHolder={"Ingrese el tipo"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputImage
                      id={"property_image"}
                      name={"property_image"}
                      labelText={"Precio"}
                      required={true}
                      setArchivos={setArchivos}
                      titulo="Arrastre su imagen"
                      archivos={3}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_financing_type"}
                      name={"property_financing_type"}
                      labelText={"Tipo de financiación"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "0", label: "Vis" },
                        { value: "1", label: "No Vis" }
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_type"}
                      name={"property_type"}
                      labelText={"Tipo de propiedad"}
                      required={!false}
                      placeHolder={"Seleccionar propiedad"}
                      selectOptions={[
                        { value: "0", label: "Casa" },
                        { value: "1", label: "Apartamento" },
                        { value: "1", label: "Duplex" },
                        { value: "1", label: "Apartaestudio" }
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_sfqt"}
                      name={"property_sfqt"}
                      labelText={"Area Construida"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su area"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_lot_sfqt"}
                      name={"property_lot_sfqt"}
                      labelText={"Area Total"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese area total"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_baths"}
                      name={"property_baths"}
                      labelText={"Baños"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Escribe los baños"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_beds"}
                      name={"property_beds"}
                      labelText={"Habitaciones"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Escriba las habitaciones"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputText
                      register={register}
                      id={"property_tour360_url"}
                      name={"property_tour360_url"}
                      labelText={"Url tour 360"}
                      // defaultValue={null}
                      // readOnly={false}
                      required={!false}
                      placeHolder={"Ingrese su url"}
                      maxLength={50}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_garage"}
                      name={"property_garaje"}
                      labelText={"Parquaderos"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "0", label: "No" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" }
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_list_amenities"}
                      name={"property_list_amentities"}
                      labelText={"Amenidades"}
                      required={!false}
                      placeHolder={"Lista"}
                      selectOptions={[
                        { value: "0", label: "Planos del proeyecto" },
                        { value: "1", label: "Chimenea" },
                        { value: "2", label: "Wifi" }
                        // { value: "3", label: "Otro" },
                        // { value: "vanilla", label: "Vanilla" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>                  
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_bluesprints"}
                      name={"property_bluesprints"}
                      labelText={"Planos de la propiedad"}
                      required={!false}
                      placeHolder={"Seleccionar plano"}
                      selectOptions={[
                        { value: "0", label: "Casa" },
                        { value: "1", label: "Apartamento" },
                        { value: "1", label: "Duplex" },
                        { value: "1", label: "Apartaestudio" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_list_sfqt"}
                      name={"property_list_sfqt"}
                      labelText={"Otras áreas de la propiedad"}
                      required={!false}
                      placeHolder={"Seleccionar areas"}
                      selectOptions={[
                        { value: "0", label: "Casa" },
                        { value: "1", label: "Apartamento" },
                        { value: "1", label: "Duplex" },
                        { value: "1", label: "Apartaestudio" }
                      ]}
                      information={"Information here!"}
                      errorList={error_list}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <InputSelect
                      Controller={Controller}
                      control={control}
                      register={register}
                      id={"property_list_prices"}
                      name={"property_list_prices"}
                      labelText={"Otros precios de la propiedad"}
                      required={!false}
                      placeHolder={"Seleccionar precio"}
                      selectOptions={[
                        { value: "0", label: "$000.000" },
                        { value: "1", label: "$000.000" },
                        { value: "1", label: "$000.000" },
                        { value: "1", label: "$000.000" }
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
