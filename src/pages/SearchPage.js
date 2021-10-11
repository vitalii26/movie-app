import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useSearchMovieQuery } from "../store/api/moviesApiSlice";
import SearchPanel from "../components/SearchPanel/SearchPanel";
import PageContainer from "../components/containers/PageContainer";
import Card from "../components/Card";
import styles from "./SearchPage.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const currentUrlParams = useQuery();
  const history = useHistory();
  const queryText = currentUrlParams.get("query") || "";
  const queryPage = currentUrlParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(Number(queryPage));

  const {
    data: movies,
    isLoading,
    isSuccess,
  } = useSearchMovieQuery({ query: queryText, page: currentPage });

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
    currentUrlParams.set("page", e.selected + 1);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
  };

  return (
    <PageContainer>
      <SearchPanel />
      <PageContainer className={styles.moviesContainer}>
        {isLoading && <span>Loading...</span>}
        {isSuccess &&
          movies.results.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
      </PageContainer>
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
