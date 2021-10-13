import { useState } from "react";
import ReactPaginate from "react-paginate";
import SearchPanel from "../components/SearchPanel";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { useGetMoviesQuery } from "../store/api/moviesApiSlice";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: movies,
    isLoading,
    isSuccess,
  } = useGetMoviesQuery(currentPage + 1);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  return (
    <>
      <PageContainer>
        <h1 className={styles.title}>Welcome.</h1>
        <h2 className={styles.subtitle}>
          Millions of movies to discover. Explore now.
        </h2>
        <SearchPanel />
      </PageContainer>

      <PageContainer className={styles.moviesContainer}>
        {isLoading && <Spinner />}
        {isSuccess &&
          movies.results.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
      </PageContainer>

      {isSuccess && (
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={styles.paginationBreak}
          pageCount={movies.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.paginationPages}
          activeLinkClassName={styles.active}
          nextClassName={styles.paginationBtn}
          previousClassName={styles.paginationBtn}
          forcePage={currentPage}
        />
      )}
    </>
  );
};

export default HomePage;
