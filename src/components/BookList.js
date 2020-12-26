import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Rating from "./Rating";
import ConfirmDelete from "./ConfirmDelete";

export default function BookList(props) {
  const {
    book,
    toggleIsRead,
    startEditing,
    deleteBook,
    rate,
    loading,
    error,
  } = props;

  // confirm delete dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return error ? (
    <span>{error.message}</span>
  ) : (
    <div className='book-wrapper'>
      <div className='book'>
        <div onClick={() => toggleIsRead(book)} className='title'>
          {book.isRead === false ? (
            <span className='titled'>{book.title}</span>
          ) : (
            <>
              <span className='titled strike'>{book.title}</span>
              <span className='ml-2'>
                <CheckCircleIcon />
              </span>
            </>
          )}
        </div>

        <div className='rating'>
          <Rating id={book.id} rate_me={rate} value={book.rating} />
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

          <div>
            <FaTrash
              size='25'
              className='fa fa-delete'
              color='#f70777'
              onClick={() => {
                handleClickOpen();
                //deleteBook(book);
              }}
            />
          </div>
          <ConfirmDelete
            handleClose={handleClose}
            deleteBook={deleteBook}
            open={open}
            book={book}
          />
        </div>
      </div>
    </div>
  );
}
