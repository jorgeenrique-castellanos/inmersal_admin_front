import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Badge, Button, Tooltip } from "shards-react";

import "react-datepicker/dist/react-datepicker.css";

export default function InputCalendario({
  id,
  name,
  labelText,
  information,
  required,
  errorList
}) {
  const [tooltip_state, setTooltipState] = useState(false);
  const icons = Icons();
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = time => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

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
          <Button
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
          </Tooltip>
        </>
      )}<br/>
      <DatePicker
        id={id}
        selected={startDate}
        onChange={date => setStartDate(date)}
        timeClassName={handleColor}
        className={`form-control ${validate(name)}`}
      />
      {getErrorMessage(name) && (
        <div className="invalid-feedback">{getErrorMessage(name)}</div>
      )}
    </>
  );
}
