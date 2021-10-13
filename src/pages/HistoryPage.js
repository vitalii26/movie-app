import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectHistoryMovieList } from "../store/historySlice";
import PageContainer from "../components/containers/PageContainer";
import styles from "./HistoryPage.module.css";

const HistoryPage = () => {
  const historyList = useSelector(selectHistoryMovieList);

  let historyContent;

  if (historyList.length > 0) {
    historyContent = historyList.map((history) => (
      <li className={styles.historyListItem} key={history.date}>
        <Link className={styles.historyLink} to={history.query}>
          <p>
            Date: <span className={styles.important}>{history.date}</span>
          </p>
          <p>
            Search query:{" "}
            <span className={styles.important}>{history.title}</span>
          </p>
        </Link>
      </li>
    ));
  } else {
    historyContent = (
      <li className={styles.historyListItem}>
        <Link to="/search" className={styles.historyLink}>
          You haven't searching for anything yet. To go to search page click
          here.
        </Link>
      </li>
    );
  }

  return (
    <PageContainer>
      <h2 className={styles.historyTitle}>History</h2>
      <ul className={styles.historyList}>{historyContent}</ul>
    </PageContainer>
  );
};

export default HistoryPage;
