import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Rating from "./Rating";

export default function BookList({
  book,
  toggleIsRead,
  startEditing,
  deleteBook,
  rate,
}) {
  return (
    <div className='book-wrapper'>
      <div className='book'>
        <div onClick={() => toggleIsRead(book)}>
          {book.isRead === false ? (
            <span>{book.title}</span>
          ) : (
            <strike className='text-danger'>{book.title}</strike>
          )}
        </div>
        <div className='rating'>
          <Rating id={book.id} rate={rate} value={book.rating} />
        </div>
        <div className='edit-delete'>
          <div>
            <FaEdit
              size='25'
              color='green'
              className='fa fa-edit'
              onClick={() => startEditing(book)}
            />
          </div>

          <div className='fa fa-delete'>
            <FaTrash size='25' color='red' onClick={() => deleteBook(book)} />
          </div>
        </div>
      </div>
    </div>
  );
}
