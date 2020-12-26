import { ActionTypes } from "../actions/ActionTypes";

const initialState = {
  token: null,
  user: null,
  isAuthed: false,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // case ActionTypes.USER_LOAD_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case ActionTypes.USER_LOAD_SUCCESS:
    //   return {
    //     ...state,
    //     isAuthed: true,
    //     loading: false,
    //     user: action.payload.user,
    //   };
    // case ActionTypes.USER_LOAD_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

    case ActionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthed: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case ActionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case ActionTypes.USER_LOGOUT_SUCCESS:
      localStorage.removeItem("user");
      return {};
    case ActionTypes.USER_LOGOUT_FAIL:
      localStorage.removeItem("user");
      return {};

    case ActionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        message: action.payload.success,
      };
    case ActionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case ActionTypes.USER_UPDATE_REQUEST:
      return { loading: true };
    case ActionTypes.USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload.user };
    case ActionTypes.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
