import SearchPanel from "../components/SearchPanel";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import { useGetMoviesQuery } from "../store/api/moviesApiSlice";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { data: movies, isLoading, isSuccess } = useGetMoviesQuery();

  return (
    <>
      <PageContainer>
        <h1 className={styles.title}>Welcome.</h1>
        <h2 className={styles.subtitle}>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <SearchPanel />
      </PageContainer>
      <PageContainer className={styles.moviesContainer}>
        {isLoading && <span>Loading...</span>}
        {isSuccess &&
          movies.results.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
      </PageContainer>
    </>
  );
};

export default HomePage;
