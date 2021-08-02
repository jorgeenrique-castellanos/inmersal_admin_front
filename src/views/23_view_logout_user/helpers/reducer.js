export default function setUIMenus(state, action) {
  alert(action.type);
  switch (action.type) {
    case "LIST":
      state = { ...state, state_action: "list" };
      return state;
    case "CREATE":
      state = { ...state, state_action: "create" };
      return state;
    case "CANCEL":
      state = { ...state, state_action: "cancel" };
      return state;
    case "EXIT":
      state = { ...state, state_action: "exit" };
      return state;
    // case "ROWSMARKED":
    //   state = { ...state, rowsmarked: action.rowsmarked };
    //   return state;
    // case "ROWSCHANGED":
    //   state = { ...state, rowschanged: true };
    //   return state;

    // case "BORRAR":
    //   state = { ...state, borrar: true };
    //   return state;
    // case "BORRADORESET":
    //   state = { ...state, borrar: false };
    //   return state;
    // case "BORRADOOK":
    //   state = {
    //     ...state,
    //     rowsmarked: [],
    //     notificacion: true,
    //     tipo: "success",
    //     mensaje: action.mensaje
    //   };
    //   return state;
    // case "NOTIFICACION":
    //   state = {
    //     ...state,
    //     notificacion: true,
    //     tipo: action.tipo,
    //     mensaje: action.mensaje
    //   };
    //   return state;
    // case "NOTIFICACIONRESET":
    //   state = { ...state, notificacion: false, mensaje: null };
    //   return state;
    // case "CAMBIAR":
    //   state = { ...state, cambiar: true };
    //   return state;
    // case "CAMBIARESET":
    //   state = { ...state, cambiar: false };
    //   return state;
    // case "CAMBIAROK":
    //   state = {
    //     ...state,
    //     cambiar: false,
    //     rowschanged: false,
    //     notificacion: true,
    //     tipo: "success",
    //     mensaje: action.mensaje
    //   };
    //   return state;

    // case "EDITAR":
    //   state = { ...state, state_action: "editar" };
    //   return state;

    // case "OK":
    //   state = { ...state, state_action: "ok" };
    //   return state;
    default:
      state = { ...state, state_action: "list" };
      return state;
  }
}

export const init_view_global_state = {
  state_action: "list"
  // notificacion: false,
  // mensaje: "",
  // borrar: false,
  // rowsmarked: [],
  // cambiar: false,
  // rowschanged: false
};
