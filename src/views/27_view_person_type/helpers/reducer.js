export default function setUIMenus(state, action) {
  alert(action.type);

  console.log(action);
  switch (action.type) {
    case "LIST":
      state = { state_action: "list" };
      return state;
    case "CREATE":
      state = { state_action: "create" };
      return state;
    case "CREATED":
      state = { state_action: "created" };
      return state;
    case "EDIT":
      state = { state_action: "edit", row: action.row };
      return state;
    case "EDITED":
      state = { state_action: "edited" };
      return state;
    case "DELETE":
      state = { state_action: "delete", row: action.row };
      return state;
    case "DELETED":
      state = { state_action: "deleted" };
      return state;
    case "CANCEL":
      state = { state_action: "cancel" };
      return state;
    // case "DOMINGO":
    //   state = { state_action: "cualquier cosa" };
    //   return state;
    default:
      state = { ...state, state_action: "list" };
      return state;
  }
}

export const init_view_global_state = {
  state_action: "list"
};
