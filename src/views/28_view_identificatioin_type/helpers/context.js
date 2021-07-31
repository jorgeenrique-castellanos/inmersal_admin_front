import React, { createContext, useReducer } from "react";
import reducer, { init_view_global_state } from "./reducer";

//prettier-ignore
const Context = createContext();
//prettier-ignore
const Provider = props => {
  const [view_global_state, dispatch] = useReducer(reducer, init_view_global_state);
  const view_global_actions = {
    // rowsmarked: data => dispatch({ type: "ROWSMARKED", rowsmarked: data }),
    // rowschanged: () => dispatch({ type: "ROWSCHANGED" }),
    // borrar: () => dispatch({ type: "BORRAR" }),
    // borradoreset: () => dispatch({ type: "BORRADORESET" }),
    // borradook: mensaje => dispatch({ type: "BORRADOOK", mensaje: mensaje }),
    // notificacion: (tipo, mensaje) => dispatch({ type: "NOTIFICACION", tipo: tipo, mensaje: mensaje }),
    // notificacionreset: () => dispatch({ type: "NOTIFICACIONRESET" }),
    // cambiar: () => dispatch({ type: "CAMBIAR" }),
    // cambiareset: () => dispatch({ type: "CAMBIARESET" }),
    // cambiarok: mensaje => dispatch({ type: "CAMBIAROK", mensaje: mensaje }),
    list: () => dispatch({ type: "LIST" }),
    create: () => dispatch({ type: "CREATE" }),
    cancel: () => dispatch({ type: "CANCEL" }),
    // ok: () => dispatch({ type: "OK" })
  };

  return (
    <Context.Provider
      value={{
        view_global_state: view_global_state,
        view_global_actions: view_global_actions
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { Provider, Context };
