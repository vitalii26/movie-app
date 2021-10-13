import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetMoviesByIdsArrayQuery } from "../store/api/moviesApiSlice";
import { selectFavouriteMovies } from "../store/favouritesSlice";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import styles from "./FavouritesPage.module.css";

const FavouritesPage = () => {
  const favouriteMovieIds = useSelector(selectFavouriteMovies);

  const {
    data: favouriteMoviesArr,
    isSuccess,
    isLoading,
  } = useGetMoviesByIdsArrayQuery(favouriteMovieIds);

  return (
    <PageContainer className={styles.favouritesContainer}>
      {isLoading && <Spinner />}

      {isSuccess &&
        favouriteMoviesArr.length > 0 &&
        favouriteMoviesArr.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })}

      {favouriteMovieIds.length < 1 && (
        <div className={styles.favouritesWrapper}>
          <h2 className={styles.favouritesTitle}>
            You don't have favourite movies
          </h2>
          <Link to="/" className={styles.favouritesLinkBtn}>
            Choose from the list
          </Link>
        </div>
      )}
    </PageContainer>
  );
};

export default FavouritesPage;
