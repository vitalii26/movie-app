import { useState, useCallback } from "react";
import useDebouncedEffect from "use-debounced-effect";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLazySearchMovieQuery } from "../../store/api/moviesApiSlice";
import useEffectOnlyOnUpdate from "../../hooks/useEffectOnlyOnUpdate";
import { checkAddToHistory } from "../../store/historySlice";
import Suggests from "../Suggests";
import styles from "./SearchPanel.module.css";

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestsData, setSuggestsData] = useState(null);
  const [trigger, { data: movies, isSuccess }] = useLazySearchMovieQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const searchMovieRequest = useCallback(
    (query) => {
      if (query) {
        trigger({ query, page: 1 });
      }
    },
    [trigger]
  );

  useDebouncedEffect(
    () => {
      searchMovieRequest(searchQuery);
    },
    500,
    [searchQuery]
  );

  useEffectOnlyOnUpdate(() => {
    if (!searchQuery) {
      setSuggestsData(null);
    }
  }, [searchQuery]);

  useEffectOnlyOnUpdate(() => {
    if (isSuccess) {
      setSuggestsData(movies);
    }
  }, [isSuccess, movies]);

  const inputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const path = `/search?query=${searchQuery}&page=1`;

    if (searchQuery) {
      history.push(path);
      dispatch(
        checkAddToHistory({
          title: searchQuery,
          query: path,
          date: new Date().toLocaleString(),
        })
      );
      setSearchQuery("");
    }
  };

  return (
    <form className={styles.searchForm}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={inputChangeHandler}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={searchSubmitHandler}
      >
        Search
      </button>
      {suggestsData && <Suggests data={suggestsData} />}
    </form>
  );
};

export default SearchPanel;
