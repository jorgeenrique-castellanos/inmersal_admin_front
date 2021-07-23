import React, { useState } from "react";
import { FormGroup, FormRadio } from "shards-react";

export default function InputRadio({ radioOptionsInit, id, labelText }) {
  const [radioOptions, setRadioOption] = useState(radioOptionsInit);

  function changeRadio(label) {
    let newarreglo = radioOptionsInit.map(option => {
      return option.label === label ? { value: true, label: label } : option;
    });

    setRadioOption(newarreglo);
  }

  let inforRadioOptions = radioOptions.map(option => {
    return (
      <FormRadio
        // inline
        checked={option.value}
        onChange={() => {
          changeRadio(option.label);
        }}
      >
        {option.label}
      </FormRadio>
    );
  });

  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {inforRadioOptions}
    </>
  );
}


// se agg de esta forma 
// import InputRadio from "../../inputs/InputRadio";

// estructura que se agg 
// <Col md="4" className="form-group">
//   <InputRadio
//     id={"checkbox_radio"}
//     labelText={"Tipo de domicilio"}
//     radioOptionsInit={[
//       { value: null, label: "Conjunto residencial" },
//       { value: null, label: "Casa campestre" },
//       { value: null, label: "Condominio" }
//     ]}
//   />
// </Col>