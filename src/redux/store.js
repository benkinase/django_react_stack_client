import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  auth: { user },
};

if (user) {
  if (user.exp * 1000 < Date.now()) {
    localStorage.removeItem("user");
  } else {
    initialState.auth.user = user.user;
    initialState.auth.token = user.token;
    initialState.auth.isAuthed = true;
  }
}
console.log(initialState);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
