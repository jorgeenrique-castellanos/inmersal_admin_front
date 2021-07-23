import React, { useState, useEffect, useContext } from 'react';
import { Contexto } from './contexto';

import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'shards-react';

export default function ({ encabezado, cuerpo, tamano, onHidden }) {

  const [abierto, setAbierto] = useState(false);
  const { estado, acciones } = useContext(Contexto);


  useEffect(() => {
    estado.accion === 'crear' || estado.accion === 'editar' ? setAbierto(true) : setAbierto(false);
  }, [estado]);

  const toggle = () => {
    setAbierto(!abierto);
  }

  const hideModal = () => {
    alert('i');
    acciones.cancelar();
  }

  return (
    <>
      <Modal size={tamano} open={abierto} toggle={toggle} hideModal={hideModal} hiddenModal={hideModal}>
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





