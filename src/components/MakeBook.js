import React from "react";

export default function MakeBook(props) {
  return (
    <div className='form-wrapper'>
      <form onSubmit={props.handleSubmit} className='form'>
        <div className='flex-wrapper'>
          <div style={{ flex: 5, marginRight: "20px" }}>
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
              id='title'
              value={props.book.author}
              type='text'
              name='author'
              placeholder='author'
            />
          </div>

          <div style={{ flex: 1 }}>
            <button type='submit' className='btn btn-warning ml-3' id='submit'>
              {props.book.id ? "Update" : "submit"}
            </button>
          </div>
          <button
            className='btn btn-sm btn-outline-dark ml-3'
            onClick={() => {
              props.open(false);
              props.setActiveBook({ ...props, editing: false });
            }}
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
}
