import React from "react";

export default function MakeBook(props) {
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
              id='title'
              value={props.book.author}
              type='text'
              name='author'
              placeholder='author'
            />
          </div>

          <div className='submit-close'>
            <button
              className='btn btn-outline-dark  '
              onClick={() => {
                props.open(false);
                props.setActiveBook({ ...props, editing: false });
              }}
            >
              close
            </button>
            <div>
              <button type='submit' className='btn btn-warning' id='submit'>
                {props.book.id ? "Update" : "submit"}
              </button>
            </div>
          </div>

          {/* <AiFillCloseSquare
            size='50'
            onClick={() => {
              props.open(false);
              props.setActiveBook({ ...props, editing: false });
            }}
          /> */}
        </div>
      </form>
    </div>
  );
}
