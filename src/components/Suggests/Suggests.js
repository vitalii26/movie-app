import React from "react";
import { Link } from "react-router-dom";
import styles from "./Suggests.module.css";

const Suggests = ({ data }) => {
  return (
    <ul className={styles.suggests}>
      {data.results.length > 0 ? (
        data.results.slice(0, 7).map((movie) => {
          return (
            <li key={movie.id} className={styles.suggestsItem}>
              <Link to={`/movies/${movie.id}`} className={styles.suggestsLink}>
                {movie.title} ({movie.release})
              </Link>
            </li>
          );
        })
      ) : (
        <li>Hmmm, we're not getting any results. Try another search</li>
      )}
    </ul>
  );
};

export default Suggests;
