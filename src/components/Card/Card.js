import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../store/favouritesSlice";
import FavouriteBtn from "../FavouriteBtn/FavouriteBtn";
import styles from "./Card.module.css";

const Card = ({ movie }) => {
  const { id, poster, title, release } = movie;
  const dispatch = useDispatch();

  const isFavourite = useSelector((state) =>
    Boolean(state.favourites.movieList?.[id])
  );

  const toggleFavouriteMovie = () => {
    dispatch(toggleFavourite({ id: movie.id, movie }));
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
          isFavourite={isFavourite}
          className={styles.cardFavourite}
          onClick={toggleFavouriteMovie}
        />
        <span>{release}</span>
      </div>
    </div>
  );
};

export default Card;
