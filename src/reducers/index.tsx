import loggedinReducer from "./auth";
import notesReducer from "./notes";
import billingReducer from "./billing";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    loggedin_state: loggedinReducer,
    note_action_fire: notesReducer,
    billing_action: billingReducer
  });

export default rootReducer;
