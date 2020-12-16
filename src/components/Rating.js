import React from "react";
//import styled from "styled-components/macro";
import { FaStar } from "react-icons/fa";

export default function Rating(props) {
  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const rValue = i + 1;
        return (
          <label key={i}>
            <input
              type='radio'
              name='rating'
              value={rValue}
              onChange={(e) => {
                props.setRating(e.target.value);
              }}
            />
            <FaStar
              size={20}
              className='star'
              color={
                rValue <= (props.hover || props.rating) ? "#f20a72" : "white"
              }
              onMouseEnter={() => props.setHover(rValue)}
              onMouseLeave={() => props.setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

// const Star = styled.span`
//   input[type="radio"] {
//     display: none;
//   }
//   .star {
//     cursor: pointer;
//     transision: color 200ms;
//     ${"" /* color: "#19f50a"; */}
//   }
// `;
