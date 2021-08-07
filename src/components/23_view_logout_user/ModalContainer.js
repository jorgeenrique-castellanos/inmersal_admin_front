import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../views/23_view_logout_user/helpers/context";
import { Modal, ModalBody, ModalHeader } from "shards-react";

//prettier-ignore
export default function({ title, subtitle, body, size }) {
  const [open_modal, toggleModal] = useState(false);
  const { view_global_state } = useContext(Context);

  useEffect(() => {
    view_global_state.state_action === "exit" ? toggleModal(true) : toggleModal(false);
  }, [view_global_state]);

  return (
    <Modal
      className="p-1"
      size={size}
      open={open_modal}
      toggle={() => {
        toggleModal(!open_modal);
      }}
    >
      <ModalHeader>{title}<p className="m-0 modales">{subtitle}</p></ModalHeader>
      <ModalBody className="p-3">{body}</ModalBody>
    </Modal>
  );
}

