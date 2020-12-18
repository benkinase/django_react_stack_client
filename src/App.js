import "./App.css";
import React from "react";
import { FaPlus } from "react-icons/fa";
import MakeBook from "./components/MakeBook";
import BookList from "./components/BookList";

const App = () => {
  const activebook = {
    id: null,
    title: "",
    author: "",
    isRead: false,
  };
  const [book, setActiveBook] = React.useState(activebook);
  const [books, setBooks] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  // fetch books upon mounting
  const alreadyRan = React.useRef(false);
  React.useEffect(() => {
    !alreadyRan.current && fetchBooks();
    return () => {
      alreadyRan.current = true;
    };
  }, [alreadyRan]);

  //
  const API_URL = process.env.REACT_APP_DJANGO_URL;
  // get all books
  function fetchBooks() {
    fetch(API_URL + "/list/")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }

  // handle input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // save book
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = API_URL + "/create/";

    if (book.editing) {
      url = API_URL + `/update/${book.id}/`;
      setActiveBook({ ...book, editing: false });
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        fetchBooks();
        setActiveBook(activebook);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
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

  // toggle isRead
  const rateBook = (id, rating) => {
    book.rating = rating;
    let url = API_URL + `/update/${id}/`;
    let updbook = { rating: book.rating };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(updbook),
    }).then(() => {
      fetchBooks();
    });
  };
  // toggle isRead
  const toggleIsRead = (book) => {
    book.isRead = !book.isRead;
    let url = API_URL + `/update/${book.id}/`;
    let updbook = { isRead: book.isRead };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(updbook),
    }).then(() => {
      fetchBooks();
    });
  };

  // delete a book
  function deleteBook(book) {
    fetch(API_URL + `/delete/${book.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }).then((res) => {
      fetchBooks();
    });
  }

  // populate fields
  const startEditing = (book) => {
    setIsOpen(true);
    setActiveBook({
      ...book,
      editing: true,
    });
  };

  return (
    <div className='book-container'>
      <div className='add-btn-container'>
        {!isOpen && (
          <div className='add-btn'>
            <FaPlus size='25' onClick={() => setIsOpen(true)} />
          </div>
        )}
      </div>

      <div className='book-wrapper'>
        {books.map((book) => {
          return (
            <BookList
              key={book.id}
              book={book}
              toggleIsRead={toggleIsRead}
              setIsOpen={setIsOpen}
              deleteBook={deleteBook}
              startEditing={startEditing}
              rate={rateBook}
            />
          );
        })}
      </div>
      <div id='form-container'>
        {isOpen && (
          <MakeBook
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            book={book}
            open={setIsOpen}
            setActiveBook={setActiveBook}
          />
        )}
      </div>
    </div>
  );
};

export default App;
