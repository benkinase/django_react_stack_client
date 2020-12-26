import { ActionTypes } from "../actions/ActionTypes";

const initialState = {
  books: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case ActionTypes.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case ActionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case ActionTypes.CLEAR_BOOKS:
      return {
        ...state,
        books: [],
      };
    default:
      return state;
  }
}
