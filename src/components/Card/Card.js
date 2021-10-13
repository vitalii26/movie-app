import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavourite,
  selectIsMovieFavourite,
} from "../../store/favouritesSlice";
import { ReactComponent as FavouriteBtn } from "../../assets/favouriteBtn.svg";
import styles from "./Card.module.css";

const Card = ({ movie }) => {
  const { id, poster, title, release } = movie;
  const dispatch = useDispatch();
  const isFavouriteSelector = useSelector(selectIsMovieFavourite);
  const isFavourite = isFavouriteSelector(id);

  const toggleFavouriteMovie = () => {
    dispatch(toggleFavourite(movie.id));
  };

  return (
    <div className={styles.card}>
      <Link className={styles.cardImgLink} to={`movies/${id}`}>
        <img className={styles.cardImg} src={poster} alt={title} />
      </Link>
      <div className={styles.cardDescription}>
        <Link to={`movies/${id}`} className={styles.cardTitle}>
          {title}
        </Link>
        <FavouriteBtn
          style={isFavourite ? { color: "red" } : null}
          className={styles.cardFavourite}
          onClick={toggleFavouriteMovie}
        />
        <span>{release}</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Card;
