export default function setUIMenus(state, action) {
  alert(action.type);
  switch (action.type) {

    case 'ROWSMARKED':
      state = { ...state, rowsmarked: action.rowsmarked };
      return state;
    case "ROWSCHANGED":
      state = { ...state, rowschanged: true };
      return state;

    case "BORRAR":
      state = { ...state, borrar: true };
      return state;
    case "BORRADORESET":
      state = { ...state, borrar: false };
      return state;
    case "BORRADOOK":
      state = { ...state, rowsmarked: [], notificacion: true, tipo: 'success', mensaje: action.mensaje };
      return state;

    case "NOTIFICACION":
      state = { ...state, notificacion: true, tipo: action.tipo, mensaje: action.mensaje };
      return state;
    case "NOTIFICACIONRESET":
      state = { ...state, notificacion: false, mensaje: null };
      return state;


    case "CAMBIAR":
      state = { ...state, cambiar: true };
      return state;
    case "CAMBIARESET":
      state = { ...state, cambiar: false };
      return state;
    case "CAMBIAROK":
      state = { ...state, cambiar: false, rowschanged: false, notificacion: true, tipo: 'success', mensaje: action.mensaje };
      return state;



    case "CREAR":
      state = { ...state, accion: 'crear' };
      return state;
      case "EDITAR":
      state = { ...state, accion: 'editar', registroactual:action.registroactual  };
      return state;

    case "LISTAR":
      state = { ...state, accion: 'listar' };
      return state;
    case "CANCELAR":
      state = { ...state, accion: 'cancelar' };
      return state;
    case "OK":
      state = { ...state, accion: 'ok' };
      return state;


    default:
      state = { ...state, accion: 'listar' };
      return state;
  }

}


export const estadoinicial = {
  accion: 'listar',
  notificacion: false,
  mensaje: '',
  borrar: false,
  rowsmarked: [],
  cambiar: false,
  rowschanged: false
};


