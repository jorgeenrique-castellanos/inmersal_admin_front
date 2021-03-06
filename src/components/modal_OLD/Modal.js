import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "shards-react";

export default function({
  switche,
  encabezado = null,
  cuerpo = null,
  tamano = "sm",
  estado = false
}) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    setAbierto(estado);
  }, [switche]);

  const toggle = () => setAbierto(!abierto);

  return (
    <>
      <Modal
        size={tamano}
        open={abierto}
        toggle={toggle}
        data-backdrop="static"
      >
        <ModalHeader>{encabezado}</ModalHeader>
        <ModalBody>{cuerpo}</ModalBody>
      </Modal>
    </>
  );
}
