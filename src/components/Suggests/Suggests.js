import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Suggests.module.css";

const Suggests = forwardRef(
  ({ data: suggestsData, onKeyDown, maxNumber }, ref) => {
    return (
      <ul className={styles.suggests} role="tablist" onKeyDown={onKeyDown}>
        {suggestsData.results.length > 0 &&
          suggestsData.results.slice(0, maxNumber).map((movie, idx) => (
            <li
              key={movie.id}
              className={styles.suggestsItem}
              role="presentation"
            >
              <Link
                to={`/movies/${movie.id}`}
                className={styles.suggestsLink}
                ref={idx === 0 ? ref : null}
                // autoFocus={idx == activeSuggest}
                role="tab"
              >
                {movie.title} ({movie.release})
              </Link>
            </li>
          ))}

        {suggestsData.results.length < 1 && (
          <li>Hmmm, we're not getting any results. Try another search</li>
        )}
      </ul>
    );
  }
);

Suggests.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Suggests;
