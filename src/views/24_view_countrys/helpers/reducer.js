export default function setUIMenus(state, action) {
  alert(action.type);

  console.log(action);
  switch (action.type) {
    case "LIST":
      state = { ...state, state_action: "list" };
      return state;
    case "CREATE":
      state = { ...state, state_action: "create" };
      return state;
    case "EDIT":
      state = { ...state, state_action: "edit" };
      return state;
    case "CANCEL":
      state = { ...state, state_action: "cancel" };
      return state;
    default:
      state = { ...state, state_action: "list" };
      return state;
  }
}

export const init_view_global_state = {
  state_action: "list"
};
