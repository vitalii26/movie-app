import { useState, useCallback, useEffect, useRef, memo } from "react";
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
  const [activeSuggest, setActiveSuggest] = useState(0);
  const maxSuggestsNumber = 7;
  const history = useHistory();
  const dispatch = useDispatch();
  const inputElRef = useRef();
  const suggestsElRef = useRef();

  const [trigger, { data: movies, isSuccess }] = useLazySearchMovieQuery();

  const searchMovieRequest = useCallback(
    (query) => {
      if (query) {
        trigger({ query, page: 1 });
      }
    },
    [trigger]
  );

  useEffect(() => {
    inputElRef.current.focus();
  }, []);

  useDebouncedEffect(
    () => {
      searchMovieRequest(searchQuery);
    },
    300,
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

  const shouldIputBlur = (e) => {
    if (e.key === "ArrowDown") {
      e.target.blur();

      suggestsElRef.current?.focus();
    }
  };

  const focusSuggestHandler = (e) => {
    if (e.key === "ArrowDown" && activeSuggest < maxSuggestsNumber - 1) {
      e.target.blur();
      e.target.parentNode.nextSibling.children[0].focus();
      setActiveSuggest(activeSuggest + 1);
    }

    if (e.key === "ArrowUp" && activeSuggest > 0) {
      e.target.blur();
      e.target.parentNode.previousSibling.children[0].focus();
      setActiveSuggest(activeSuggest - 1);
    }

    if (e.key === "ArrowUp" && activeSuggest === 0) {
      e.target.blur();
      inputElRef.current.focus();
    }
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
        ref={inputElRef}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChange={inputChangeHandler}
        onKeyDown={shouldIputBlur}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={searchSubmitHandler}
      >
        Search
      </button>
      {isSuccess && suggestsData && (
        <Suggests
          data={suggestsData}
          ref={suggestsElRef}
          onKeyDown={focusSuggestHandler}
          maxNumber={maxSuggestsNumber}
        />
      )}
    </form>
  );
};

export default memo(SearchPanel);
