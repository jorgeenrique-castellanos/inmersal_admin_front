import React, { useState } from "react";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Badge, Button, Tooltip, FormCheckbox, FormGroup } from "shards-react";

export default function InputToggle({
  register,
  id,
  name,
  labelText,
  required,
  small,
  checkStateDefault,
  toggleValues,
  information
}) {
  const icons = Icons();
  const [tooltip_state, setTooltipState] = useState(false);
  const [check_state, setCheckState] = useState(checkStateDefault);
  const toggleValue = check_state ? toggleValues[0] : toggleValues[1];
  return (
    <>
      <FormGroup>
        {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
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
        <FormCheckbox
          innerRef={register}
          id={id}
          name={name}
          required={required}
          toggle
          small={small}
          checked={check_state}
          onChange={() => {
            setCheckState(!check_state);
          }}
        >
          {toggleValue}
        </FormCheckbox>
      </FormGroup>
    </>
  );
}
