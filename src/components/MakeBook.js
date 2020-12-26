import React from "react";
import { useSelector } from "react-redux";

export default function MakeBook(props) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='form-wrapper'>
      <form onSubmit={props.handleSubmit} className='form'>
        <div className='flex-wrapper'>
          <div style={{ flex: 5, marginBottom: "7px" }}>
            <input
              onChange={props.handleChange}
              className='form-control'
              id='title'
              value={props.book.title}
              type='text'
              name='title'
              placeholder='title'
            />
          </div>
          <div style={{ flex: 5 }}>
            <input
              onChange={props.handleChange}
              className='form-control'
              id='author'
              value={props.book.author}
              type='text'
              name='author'
              placeholder='author'
            />
          </div>

          <div>
            <button type='submit' className='submit-btn'>
              {props.book.id ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
