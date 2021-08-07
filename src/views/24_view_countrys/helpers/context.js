import React, { createContext, useReducer } from "react";
import reducer, { init_view_global_state } from "./reducer";

//prettier-ignore
const Context = createContext();
//prettier-ignore
const Provider = props => {
  const [view_global_state, dispatch] = useReducer(reducer, init_view_global_state);
  const view_global_actions = {
    list: () => dispatch({ type: "LIST" }),
    create: () => dispatch({ type: "CREATE" }),
    created: () => dispatch({ type: "CREATED" }),
    edit: (row) => dispatch({ type: "EDIT", row: row }),
    edited: () => dispatch({ type: "EDITED" }),
    delete: (row) => dispatch({ type: "DELETE", row: row }),
    deleted: (row) => dispatch({ type: "DELETED", row: row }),
    cancel: () => dispatch({ type: "CANCEL" }),
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
