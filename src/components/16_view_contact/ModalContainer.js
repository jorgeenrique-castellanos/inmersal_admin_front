import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../views/16_view_contact/helpers/context";
import { Modal, ModalBody, ModalHeader } from "shards-react";

//prettier-ignore
export default function({ title, body, size }) {
  const [open_modal, toggleModal] = useState(false);
  const { view_global_state } = useContext(Context);

  useEffect(() => {
    view_global_state.state_action === "create" ? toggleModal(true) : toggleModal(false);
  }, [view_global_state]);

  return (
    <Modal
      size={size}
      open={open_modal}
      toggle={() => {
        toggleModal(!open_modal);
      }}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody className="p-3">{body}</ModalBody>
    </Modal>
  );
}
