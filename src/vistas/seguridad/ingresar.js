// import { FormGroup } from "@material-ui/core";
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


const Ingresar = () => {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)} className="formlogin d-flex flex-column p-3">
          <FormGroup>
            <label htmlFor="emailAddress">Correo Electronico</label>
            <FormInput innerRef={register}
              name="emailAddress"
              placeholder="Ingrese su correo"
              valid={true}
            />
            <FormFeedback valid>Correo aceptado!</FormFeedback>
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Contraseña</label>
            <FormInput innerRef={register}
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              invalid={true}
            />
          </FormGroup>

          <ButtonGroup className="mb-3">
            <Button type="submit" theme="primary">Ingresar</Button>
            <Button theme="white">Cancelar</Button>
          </ButtonGroup>
          <div className="text-center">
            <a href="#" className="p-2">Olvide Contraseña</a>
            <a href="#" className="p-2">Registrate</a>
          </div>
        </Form>
      </div>

    </>
  );

};

export default Ingresar;

// return (
//   <ListGroup flush>
//     <ListGroupItem className="p-3">
//       <Row>
//         <Col>
//           <Form className="formlogin">
            // <Row form className="flex-column">
            //   <Col md="6" className="form-group">
            //     <label htmlFor="feEmailAddress">Correo - Usuario</label>
            //     <FormInput
            //       id="feEmailAddress"
            //       type="email"
            //       placeholder="Email"
            //       valid= {true}
            //     />
            //     <FormFeedback valid>The first name looks good!</FormFeedback>
            //   </Col>
            //   <Col md="6">
            //     <label htmlFor="fePassword">Contraseña</label>
            //     <FormInput
            //       id="fePassword"
            //       type="password"
            //       placeholder="Password"
            //       invalid= {true}
            //     />
            //   </Col>
            //   <Col className="py-2">
            //   <a href="#">Olvide Contraseña</a>
            //   </Col>
            // </Row>

//             <Row form>
//               <Col md="12" className="form-group">
//                 <FormCheckbox>
//                   {/* eslint-disable-next-line */}I agree with your{" "}
//                   <a href="#">Privacy Policy</a>.
//                 </FormCheckbox>
//               </Col>
//             </Row>
//             <Button type="submit">Iniciar sesion</Button>
//           </Form>
//         </Col>
//       </Row>
//     </ListGroupItem>
//   </ListGroup>
//   );