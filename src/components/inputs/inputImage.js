import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Col, Button, Tooltip } from "shards-react";

export default function Archivos({
  id,
  name,
  labelText,
  required,
  information,
  setArchivos,
  titulo,
  archivos
}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const [tooltip_state, setTooltipState] = useState(false);
  const icons = Icons();

  return (
    <Col className="p-0">
      {labelText ? <label htmlFor={id}>{labelText}</label> : ""}
      {/* {!required && <Badge className="badge-input-optional">Opcional</Badge>} */}
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
      <section className="container border border-light text-center p-2">
        <div {...getRootProps({ className: "dropzone" })}>
          <input
            {...getInputProps()}
            // ref={register({ readOnly: readOnly, maxLength: maxLength })}
            id={id}
            name={name}
          />

          <p className="m-0">{titulo}</p>
        </div>
        <aside>
          <ul required={required}>{files}</ul>
        </aside>
      </section>
    </Col>
  );
}
