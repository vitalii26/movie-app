import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavourite,
  selectIsMovieFavourite,
} from "../store/favouritesSlice";
import { useGetMovieByIdQuery } from "../store/api/moviesApiSlice";
import BgImageContainer from "../components/containers/BgImageContainer";
import PageContainer from "../components/containers/PageContainer";
import { ReactComponent as FavouriteBtn } from "../assets/favouriteBtn.svg";
import MovieTabs from "../components/MovieTabs";
import Spinner from "../components/Spinner";
import ErrorIndicator from "../components/ErrorIndicator";
import styles from "./MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isFavouriteSelector = useSelector(selectIsMovieFavourite);
  const isFavourite = isFavouriteSelector(id);

  const {
    data: movie,
    isSuccess,
    isLoading,
    isError,
  } = useGetMovieByIdQuery(id);

  const toggleFavouriteMovie = () => {
    dispatch(toggleFavourite(movie.id));
  };

  return (
    <>
      {isLoading && (
        <PageContainer>
          <Spinner />
        </PageContainer>
      )}
      {isError && <ErrorIndicator />}
      {isSuccess && (
        <>
          <BgImageContainer bgPath={movie.backdrop}>
            <div className={styles.movieContainer}>
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
                {movie.companies.length > 1 && (
                  <ul className={styles.movieLogos}>
                    {movie.companies.map(({ logo, name }) => (
                      <li key={name}>
                        {logo ? (
                          <img
                            src={logo}
                            alt={name}
                            className={styles.movieLogo}
                          />
                        ) : (
                          <span className={styles.movieLogo}>{name}</span>
                        )}
                      </li>
                    ))}
                    <FavouriteBtn
                      className={styles.movieFavouriteBtn}
                      onClick={toggleFavouriteMovie}
                      style={isFavourite ? { color: "red" } : null}
                    />
                  </ul>
                )}
              </div>
            </div>
          </BgImageContainer>
          <MovieTabs />
        </>
      )}
    </>
  );
};

export default MoviePage;
