import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SearchPanel.module.css";

const SearchPanel = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const searchHandler = () => {
    history.push(`/search?${searchText}`);
  };

  return (
    <form className={styles.searchForm}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a movie..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={searchHandler}
      >
        Search
      </button>
    </form>
  );
};

export default SearchPanel;
