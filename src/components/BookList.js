import React from "react";
//import Rating from "./Rating";

export default function BookList({
  book,
  toggleIsRead,
  startEditing,
  deleteBook,
  setIsOpen,
  // setHover,
  // setRating,
  // hover,
  // rating,
}) {
  return (
    <div className='book-wrapper flex-wrapper'>
      <div onClick={() => toggleIsRead(book)} style={{ flex: 7 }}>
        {book.isRead === false ? (
          <span>{book.title}</span>
        ) : (
          <strike className='text-warning'>{book.title}</strike>
        )}
      </div>
      {/* <div className='rating'>
        <Rating
          setRating={setRating}
          setHover={setHover}
          rating={rating}
          hover={hover}
        />
      </div> */}

      <div style={{ flex: 1 }}>
        <button
          className='btn btn-sm btn-outline-info'
          onClick={() => startEditing(book)}
        >
          Edit
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <button
          className='btn btn-sm btn-outline-dark delete'
          onClick={() => deleteBook(book)}
        >
          -
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <button
          className='btn btn-sm btn-outline-dark delete'
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>
    </div>
  );
}
