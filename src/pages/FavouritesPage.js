import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import styles from "./FavouritesPage.module.css";

const FavouritesPage = () => {
  const favouriteMovies = useSelector((state) => state.favourites.movieList);
  const favouriteMoviesArr = Object.values(favouriteMovies);

  return (
    <PageContainer className={styles.favouritesContainer}>
      {favouriteMoviesArr.length > 0 ? (
        favouriteMoviesArr.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })
      ) : (
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
