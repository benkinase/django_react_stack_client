import { ActionTypes } from "../actions/ActionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
