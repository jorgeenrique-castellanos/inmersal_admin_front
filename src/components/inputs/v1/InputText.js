import React, { useState } from "react";
import Icons from "../../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Badge, Button, Tooltip } from "shards-react";
import _ from "lodash";

//prettier-ignore
const InputText = ({
  register,
  id,
  name,
  labelText,
  defaultValue,
  readOnly,
  required,
  placeHolder,
  maxLength,
  information,
  errorList
}) => {
  const [tooltip_state, setTooltipState] = useState(false);
  const icons = Icons();
  
  const validate = name => errorList === 'init' ? 'valido' : (_.has(errorList, name) ? "is-invalid" : "is-valid") ;

  const getErrorMessage = name => _.get(errorList, name, false);

  const message = name => validate === "init" ? "valido" : (_.has(errorList, name) ? "is-invalid" : "Campo completado")
  
  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {!required && <Badge className="badge-input-optional">*</Badge>}
      {/* {information && (
        <>        
        </>
      )} */}
      <input
        ref={register({readOnly: readOnly, maxLength: maxLength})}
        id={id}
        name={name}
        value={defaultValue}
        type="text"
        className={`form-control ${validate(name)}`}
        placeHolder={placeHolder}
      />
      {getErrorMessage(name) && (<div className="invalid-feedback">{getErrorMessage(name)}</div>)}
      {message(name) && (<div className="valid-feedback">{message(name)}</div>)}

    </>
  );
};

export default InputText;
