export default function setUIMenus(state, action) {
  alert(action.type);
  switch (action.type) {
    case "CANCEL":
      state = { ...state, state_action: "cancel" };
      return state;
    case "EXIT":
      state = { ...state, state_action: "exit" };
      return state;
    default:
      state = { ...state, state_action: "list" };
      return state;
  }
}

export const init_view_global_state = {
  state_action: "exit"
};
