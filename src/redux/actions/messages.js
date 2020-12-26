import { ActionTypes } from "./ActionTypes";

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: ActionTypes.CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: ActionTypes.GET_ERRORS,
    payload: { msg, status },
  };
};
