import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { ActionTypes } from "./ActionTypes";

const api = axios.create({
  baseURL: process.env.REACT_APP_DJANGO_URL,
});

// GET BOOKS
export const getBooks = () => (dispatch, getState) => {
  api
    .get("/api/books/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_BOOKS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE BOOK
export const deleteBook = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/books/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteBook: "Book Deleted" }));
      dispatch({
        type: ActionTypes.DELETE_BOOK,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD BOOK
export const addBook = (book) => (dispatch, getState) => {
  axios
    .post("/api/books/", book, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addBook: "Book Added" }));
      dispatch({
        type: ActionTypes.ADD_BOOK,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
