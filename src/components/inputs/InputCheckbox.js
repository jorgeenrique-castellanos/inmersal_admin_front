import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FormCheckbox, FormGroup } from "shards-react";

export default function InputCheckbox({ checkboxOptionsInit, labelText, id }) {
  const [checkboxOptions, setCheckboxOptions] = useState(checkboxOptionsInit);

  function changeState(label, value) {
    let checkboxOptionNew = checkboxOptions.map(option => {
      return option.label === label ? { value: !value, label: label } : option;
    });

    setCheckboxOptions(checkboxOptionNew);
  }

  let inforCheckboxOtions = checkboxOptions.map(option => {
    return (
      <FormCheckbox
        // inline
        id={id}
        checked={option.value}
        onChange={() => {
          changeState(option.label, option.value);
        }}
      >
        {option.label}
      </FormCheckbox>
    );
  });

  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {inforCheckboxOtions}
    </>
  );
}

// asi se debe importar 
// import InputCheckbox from "../../inputs/InputCheckbox";

// la estructura se agg asi 
{/* <Col md="4" className="form-group">
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
</Col> */}
                 