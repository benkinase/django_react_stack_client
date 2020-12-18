import React from "react";
import { FaStar } from "react-icons/fa";

export default function Rating(props) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(null);

  const { id, rate, value } = props;

  React.useEffect(() => {
    rating && rate(id, rating);
  }, [rating]);

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
                setRating(e.target.value);
              }}
            />
            <FaStar
              size={20}
              className='star'
              color={rValue <= (hover || value) ? "#ffae00" : "black"}
              onMouseEnter={() => setHover(rValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
