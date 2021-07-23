import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormInput,
  FormGroup,
  FormFeedback,
  ButtonGroup,
  Button
} from "shards-react";

// import "../../shards-dashboard/styles/scss/shards-dashboards.css";
// import "../../assets/inmersal_normal.css";


const Restaurarlogin = () => {

  const { register, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);

  const button = {
    margin:"0 auto"
  }
  
  return (
    <>
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="formlogin d-flex flex-column p-3">
        <FormGroup>
        <p className="mb-3 text-center">Ingresa tu correo Electronico donde se enviara un codigo de recuperacións.</p>
        <label htmlFor="emailAddress">Correo Electronico</label>
        <FormInput innerRef={register}
          name="emailAddress"
          placeholder="Ingrese su correo"
          valid= {true}
        />
        <FormFeedback valid>Recuperar contraseña!</FormFeedback>
      </FormGroup>

      <ButtonGroup className="mb-3">
        <Button type="submit" theme="primary" style={button}>Enviar</Button>    
      </ButtonGroup>
    </Form>
  </div>
  
  </>
);
 
};

export default Restaurarlogin;