import React, { useState, useEffect, useContext } from 'react';
import { Contexto } from './contexto';

import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'shards-react';

export default function ({ encabezado, cuerpo, tamano }) {

  const [abierto, setAbierto] = useState(false);
  const { estado, acciones } = useContext(Contexto);


  useEffect(() => {
    estado.accion === 'crear' ? setAbierto(true) : setAbierto(false);
  }, [estado]);

  const toggle = () => {
    setAbierto(!abierto);
  }

  return (
    <>
      <Modal size={tamano} open={abierto} toggle={toggle}>
        <ModalHeader>
          {encabezado}
        </ModalHeader>

        <ModalBody>
          {cuerpo}
        </ModalBody>
      </Modal>
    </>
  );
};





