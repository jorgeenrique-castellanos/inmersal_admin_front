import React, { createContext, useReducer } from "react";
import reducer, { init_view_global_state } from "./reducer";

//prettier-ignore
const Context = createContext();
//prettier-ignore
const Provider = props => {
  const [view_global_state, dispatch] = useReducer(reducer, init_view_global_state);
  const view_global_actions = {
    cancel: () => dispatch({ type: "CANCEL" }),
    exit: () => dispatch({ type: "EXIT" }),  
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
