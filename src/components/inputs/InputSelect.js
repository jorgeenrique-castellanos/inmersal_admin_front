import React, { useState } from "react";
import _ from "lodash";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import Select from "react-select";
import { Badge, Button, Tooltip } from "shards-react";

export default ({
  Controller,
  control,
  id,
  name,
  labelText,
  defaultValue,
  selectOptions,
  required,
  placeHolder,
  information,
  errorList
}) => {
  const [tooltip_state, setTooltipState] = useState(false);
  const icons = Icons();
  const validate = name => {
    if (!errorList[name] || errorList[name] === "init") {
      return "";
    } else {
      return errorList[name] === "is-valid" ? "is-valid" : "is-invalid";
    }
  };
  const getErrorMessage = name => {
    return errorList[name] && errorList.error_messages[name]
      ? errorList.error_messages[name]
      : false;
  };

  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {!required && <Badge className="badge-input-optional">Opcional</Badge>}
      {information && (
        <>
          {/* <Button
            onClick={e => {
              e.preventDefault();
            }}
            className="btn-icon-mini"
            id={`${id}_information`}
          >
            {ReactHtmlParser(icons.information.icon)}
          </Button>
          <Tooltip
            trigger="click"
            open={tooltip_state}
            target={`#${id}_information`}
            toggle={() => {
              setTooltipState(!tooltip_state);
            }}
          >
            {information}
          </Tooltip> */}
        </>
      )}
      <Controller
        as={Select}
        control={control}
        id={id}
        name={name}
        defaultValue={defaultValue}
        options={selectOptions}
        className={`form-control-select ${validate(name)}`}
        placeholder={placeHolder}
      />
      {getErrorMessage(name) && (
        <div className="invalid-feedback">{getErrorMessage(name)}</div>
      )}
    </>
  );
};
