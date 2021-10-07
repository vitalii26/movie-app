import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import BgImageContainer from "../components/containers/BgImageContainer";
import PageContainer from "../components/containers/PageContainer";
import { useGetMovieByIdQuery } from "../store/api/moviesApiSlice";
import FavouriteBtn from "../components/FavouriteBtn/FavouriteBtn";
import { toggleFavourite } from "../store/favouritesSlice";
import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: movie, isSuccess } = useGetMovieByIdQuery(id);
  const isFavourite = useSelector((state) => state.favourites.movieList?.[id]);

  const toggleFavouriteMovie = () => {
    dispatch(toggleFavourite({ id: movie.id, movie }));
  };

  return (
    isSuccess && (
      <BgImageContainer bgPath={movie.backdrop}>
        <PageContainer className={styles.movieContainer}>
          <img
            className={styles.movieImg}
            src={movie.poster}
            alt={movie.title}
          />
          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>
              {movie.title} ({movie.release})
            </h2>
            <h4 className={styles.movieSubtitle}>
              {movie.genres} &#183; {movie.runtime}
            </h4>
            <p className={styles.movieTagline}>{movie.tagline}</p>
            <p className={styles.movieOverview}>{movie.overview}</p>
            <h3 className={styles.movieSubtitle}>Companies: </h3>
            <ul className={styles.movieLogos}>
              {movie.companies.map(({ logo, name }) => (
                <li key={name}>
                  {logo ? (
                    <img src={logo} alt={name} className={styles.movieLogo} />
                  ) : (
                    <span className={styles.movieLogo}>{name}</span>
                  )}
                </li>
              ))}
              <FavouriteBtn
                className={styles.movieFavouriteBtn}
                onClick={toggleFavouriteMovie}
                isFavourite={isFavourite}
              />
              ;
            </ul>
          </div>
        </PageContainer>
      </BgImageContainer>
    )
  );
};

export default MoviePage;
