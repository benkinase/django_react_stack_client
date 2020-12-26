import React from "react";
import { FaPlus } from "react-icons/fa";
import MakeBook from "./MakeBook";
import BookList from "./BookList";
import Modal from "./Modal/Modal";

const Books = () => {
  const activebook = {
    id: null,
    title: "",
    author: "",
    isRead: false,
  };
  const [book, setActiveBook] = React.useState(activebook);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [isToggled, setModalToggled] = React.useState(false);

  // close modal and reset editing
  const toggleClose = () => {
    setModalToggled(false);
    setActiveBook(activebook);
  };

  // fetch books upon mounting
  const alreadyRan = React.useRef(false);
  React.useEffect(() => {
    !alreadyRan.current && fetchBooks();
    return () => {
      alreadyRan.current = true;
    };
  }, [alreadyRan]);

  //
  const API_URL = "http://127.0.0.1:8000"; //process.env.REACT_APP_DJANGO_URL;
  // get all books
  function fetchBooks() {
    setLoading(true);
    fetch(API_URL + "/api/books/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);

        setLoading(false);
      })
      .catch((err) => setError(err));
  }

  // handle input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // get auth
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

  // save book
  const handleSubmit = (e) => {
    if (!book.author || !book.title) {
      return false;
    }
    e.preventDefault();
    let url = API_URL + `/api/books/`;

    if (book.editing) {
      url = API_URL + `/api/books/${book.id}/`;
      setActiveBook({ ...book, editing: false });
    }
    fetch(url, {
      method: book.editing ? "PUT" : "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        fetchBooks();
        setActiveBook(activebook);
        //setIsOpen(false);
        setModalToggled(false);
      })
      .catch(function (err) {
        setError(err);
      });
  };

  // toggle isRead
  const rateBook = (id, rating) => {
    book.rating = rating;
    let url = API_URL + `/api/books/${id}/`;
    let updated = { rating: book.rating };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(updated),
    })
      .then(() => {
        fetchBooks();
      })
      .catch((err) => {
        setError(err);
      });
  };
  // toggle isRead
  const toggleIsRead = (book) => {
    book.isRead = !book.isRead;
    let url = API_URL + `/api/books/${book.id}/`;
    let updated = { isRead: book.isRead };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(updated),
    }).then(() => {
      fetchBooks();
    });
  };

  // delete a book
  function deleteBook(book) {
    fetch(API_URL + `/api/books/${book.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    })
      .then((res) => {
        fetchBooks();
      })
      .catch((err) => {
        setError(err);
      });
  }

  // populate fields
  const startEditing = (book) => {
    //setIsOpen(true);
    setModalToggled(true);
    setActiveBook({
      ...book,
      editing: true,
    });
  };

  return (
    <div className='book-container'>
      <div className='add-btn-container'>
        {!isToggled && (
          <div className='add-btn'>
            <FaPlus size='25' onClick={() => setModalToggled(true)} />
          </div>
        )}
      </div>

      <div className='book-wrapper'>
        {books?.map((book) => {
          return (
            <BookList
              key={book.id}
              book={book}
              toggleIsRead={toggleIsRead}
              deleteBook={deleteBook}
              startEditing={startEditing}
              rate={rateBook}
              error={error}
              loading={loading}
            />
          );
        })}
      </div>

      <Modal show={isToggled} modalClosed={toggleClose}>
        <div style={{ color: "black" }}>
          <MakeBook
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            book={book}
            setActiveBook={setActiveBook}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Books;
