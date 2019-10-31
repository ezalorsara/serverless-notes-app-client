type ActionState = {
  type: string;
};

let local_storage = localStorage.getItem('persist:root');
const initialState = local_storage == null ? false : JSON.parse(local_storage).loggedin_state;
const loggedinReducer = (state = initialState, action: ActionState) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return true;
    case "SUCCESS_LOGOUT":
      return false;
    default:
      return state;
  }
};

export default loggedinReducer;
