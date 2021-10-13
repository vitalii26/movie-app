import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSearchMovieQuery } from "../store/api/moviesApiSlice";
import useQuery from "../hooks/useQuery";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import ErrorIndicator from "../components/ErrorIndicator";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const currentUrlParams = useQuery();
  const history = useHistory();
  const queryText = currentUrlParams.get("query") || "a";
  const queryPage = currentUrlParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(Number(queryPage));

  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
  } = useSearchMovieQuery({ query: queryText, page: currentPage });

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
    currentUrlParams.set("page", e.selected + 1);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  };

  return (
    <PageContainer>
      <SearchPanel />
      <div className={styles.moviesContainer}>
        {isLoading && <Spinner />}
        {isError && <ErrorIndicator />}

        {isSuccess && movies.results.length > 0 ? (
          movies.results.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })
        ) : (
          <h2 className={styles.moviesTitle}>oops! Nothing Found</h2>
        )}
      </div>

      {isSuccess && movies.totalPages > 1 && (
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
          forcePage={currentPage - 1}
        />
      )}
    </PageContainer>
  );
};

export default SearchPage;
