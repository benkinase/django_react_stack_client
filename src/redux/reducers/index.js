import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";
import errors from "./errors";
import messages from "./messages";

const rootReducer = combineReducers({ auth, books, errors, messages });

export default rootReducer;
