import React, { useEffect, useContext } from "react";
import _ from "lodash";
import { Context } from "../../views/08_view_projectListNearbyPLaces/helpers/context";
import { toast, ToastContainer } from "react-toastify";

export default function() {
  const { view_global_state, view_global_actions } = useContext(Context);

  const mostrarmensaje = (tipo, mensaje) => {
    toast[tipo](mensaje, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    view_global_actions.notificacionreset();
  };

  useEffect(() => {
    const mensaje = _.get(view_global_state, "mensaje", "");
    if (view_global_state.notificacion && !_.isEmpty(mensaje)) {
      const tipo = _.get(view_global_state, "tipo", "error");
      mostrarmensaje(tipo, mensaje);
    }
  }, [view_global_state.notificacion, view_global_state.mensaje]);

  return <ToastContainer />;
}
