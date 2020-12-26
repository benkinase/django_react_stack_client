import { ActionTypes } from "./ActionTypes";
import api from "../../utils/axios";
import { returnErrors } from "./messages";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_LOAD_REQUEST,
    payload: {},
  });
  try {
    const { data } = await api.get("/api/auth/user", tokenConfig(getState));
    dispatch({ type: ActionTypes.USER_LOAD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ActionTypes.USER_LOAD_FAIL,
      payload: err?.response?.data?.detail,
    });
  }
};

// log in existing user
export const login = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: body,
  });
  try {
    const { data } = await api.post("/api/auth/login", body, config);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload: err.response.data.detail,
    });
  }
};

// register new user
export const register = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: ActionTypes.USER_REGISTER_REQUEST,
    payload: body,
  });
  // Request Body

  try {
    const { data } = await api.post("/api/auth/register", body, config);
    dispatch({ type: ActionTypes.USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    //dispatch(returnErrors(err.response.data.detail, err.response.status));
    dispatch({
      type: ActionTypes.USER_REGISTER_FAIL,
      payload: err.response.data.detail,
    });
  }
};

// log out user
export const logout = () => async (dispatch) => {
  dispatch({ type: ActionTypes.USER_LOGOUT });
};
// LOGOUT USER/ DESTROY TOKEN/BACKEND
export const logoutUser = () => (dispatch, getState) => {
  api
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      //dispatch({ type: ActionTypes.CLEAR_BOOKS });
      dispatch({
        type: ActionTypes.USER_LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.USER_LOGOUT_FAIL,
        payload: err?.response?.data?.detail,
      });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from auth state
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
