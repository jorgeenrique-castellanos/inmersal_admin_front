import React, { useState } from "react";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Badge, Button, Tooltip } from "shards-react";

//prettier-ignore
const InputPassword = ({
  register,
  id,
  name,
  labelText,
  required,
  placeHolder,
  maxLength,
  information,
  errorList
}) => {
  const [tooltip_state, setTooltipState] = useState(false);
  const icons = Icons();
  const validate = name => {
    if (!errorList[name] || errorList[name] === "init") {
      return ""
    }
    else  {
      return errorList[name] === "is-valid" ? "is-valid" : "is-invalid";
    }
  };
  const getErrorMessage = name => {
    return errorList[name] && errorList.error_messages[name] ? errorList.error_messages[name] : false;
  }
 
  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {!required && <Badge className="badge-input-optional">Opcional</Badge>}
      {information && (
        <>
          {/* <Button onClick={(e)=>{e.preventDefault()}} className="btn-icon-mini" id={`${id}_information`}>{ReactHtmlParser(icons.information.icon)}</Button>
          <Tooltip
            trigger="click"
            open={tooltip_state}
            target={`#${id}_information`}
            toggle={()=>{setTooltipState(!tooltip_state)}}
          >
            {information}
          </Tooltip> */}
        </>
      )}
      <input
        ref={register({maxLength: maxLength})}
        id={id}
        name={name}
        type="password"
        className={`form-control ${validate(name)}`}
        placeHolder={placeHolder}
      />
      {getErrorMessage(name) && (<div className="invalid-feedback">{getErrorMessage(name)}</div>)}
    </>
  );
};

export default InputPassword;
