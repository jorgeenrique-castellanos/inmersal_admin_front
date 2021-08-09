import React, { useState } from "react";
import InputImage from "../../inputs/inputImage";
import InputText from "../../inputs/InputText";
import { useForm, Controller } from "react-hook-form";
import { validateFormData } from "../../../helpers/form_validate";
import formCreateParams from "./form_create_params";

import { Form, Button, Row, Col } from "shards-react";
// import "./styles.css";

const WizardContext = React.createContext();

const WizardButtonPrev = props => {
  const { goPrevPage, activePageIndex } = React.useContext(WizardContext);
  return activePageIndex > 0 ? (
    <Button type="button" {...props} onClick={goPrevPage}>
      Atras
    </Button>
  ) : null;
};

const WizardButtonNext = props => {
  const { goNextPage, activePageIndex, steps } = React.useContext(
    WizardContext
  );
  return activePageIndex < steps - 1 ? (
    <Button type="button" {...props} onClick={goNextPage}>
      Siguiente
    </Button>
  ) : null;
};

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  const goNextPage = () => {
    setActivePageIndex(index => index + 1);
  };

  const goPrevPage = () => {
    setActivePageIndex(index => index - 1);
  };

  const context = {
    activePageIndex,
    goNextPage,
    goPrevPage,
    steps
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const WizardPages = props => {
  const { activePageIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(props.children);
  const currentPage = pages[activePageIndex];
  return <div {...props}>{currentPage}</div>;
};

const Page1 = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState({});
  const form_params = formCreateParams(null);

  const onSubmit = data => {
    console.log(data);
    validateFormData(form_params, data, processValidation);
  };

  const processValidation = result => {
    console.log(result);
    // result.error ? viewErrors(result) : sendToServer(result.data);
  };
  return (
    // <div>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row form>
        <Col md="12" className="form-group">
          <InputText
            register={register}
            id={"project_name"}
            name={"project_name"}
            labelText={"Nombres"}
            required={!false}
            placeHolder={"Escribir nombres"}
            // maxLength={50}s
            information={"Information here!"}
            errorList={error_list}
          />
        </Col>
        <Col md="12" className="form-group">
          <InputText
            register={register}
            id={"project_description"}
            name={"project_description"}
            labelText={"Apellidos"}
            required={!false}
            placeHolder={"Escribir apellidos"}
            // maxLength={50}
            information={"Information here!"}
            errorList={error_list}
          />
        </Col>
        <Col md="12" className="form-create-footer">
          <Button className="btn-text-icon-right mr-2" pill type="submit">
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
    // </div>
  );
};

const Page2 = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [error_list, setErrorList] = useState({});

  return (
    // <div>
    <Form onSubmit={handleSubmit(WizardButtonNext)}>
      <Row form>
        <Col md="12" className="form-group">
          <InputText
            register={register}
            id={"project_name"}
            name={"project_name"}
            labelText={"Telefono"}
            required={!false}
            placeHolder={"Escribir telefono"}
            // maxLength={50}
            information={"Information here!"}
            errorList={error_list}
          />
        </Col>
        <Col md="12" className="form-group">
          <InputText
            register={register}
            id={"project_description"}
            name={"project_description"}
            labelText={"Description"}
            required={!false}
            placeHolder={"Escribir la descripcion"}
            // maxLength={50}
            information={"Information here!"}
            errorList={error_list}
          />
        </Col>
      </Row>
    </Form>
    // </div>
  );
};

const Page3 = () => (
  <div>
    <h1>Pagina 3</h1>
  </div>
);

const App = () => {
  return (
    <Wizard steps={3}>
      <WizardPages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </WizardPages>
      <div className="wizard__buttons d-flex justify-content-center">
        <WizardButtonPrev className="wizard__buttons-left mr-2" />
        <WizardButtonNext className="wizard__buttons-right" />
      </div>
    </Wizard>
  );
};

export default App;
