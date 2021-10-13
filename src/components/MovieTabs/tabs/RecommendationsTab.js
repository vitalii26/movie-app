import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetMovieRecommendationsQuery } from "../../../store/api/moviesApiSlice";
import Spinner from "../../Spinner";
import ErrorIndicator from "../../ErrorIndicator";
import styles from "./RecommendationsTab.module.css";

const RecommendationsTab = ({ id }) => {
  const {
    data: recommendationsData,
    isSuccess,
    isLoading,
    isError,
  } = useGetMovieRecommendationsQuery(id);

  return (
    <ul className={styles.recommendationsTab}>
      {isLoading && <Spinner />}

      {isError && <ErrorIndicator />}

      {isSuccess &&
        recommendationsData.length > 0 &&
        recommendationsData.map((rec) => {
          return (
            <li className={styles.recommendationTabItem} key={rec.id}>
              <div className={styles.recommendationCard}>
                <Link
                  to={`/movies/${rec.id}`}
                  className={styles.recommendationsImgWrapper}
                >
                  <img
                    src={rec.poster}
                    alt={rec.title}
                    className={styles.recommendationsImg}
                  />
                </Link>
                <Link
                  className={styles.recommendationCardTitle}
                  to={`/movies/${rec.id}`}
                >
                  {rec.title} <span>({rec.release})</span>
                </Link>
              </div>
            </li>
          );
        })}

      {isSuccess && recommendationsData.length < 1 && (
        <div className={styles.recommendationCardText}>
          There aren't any recommendations
        </div>
      )}
    </ul>
  );
};

RecommendationsTab.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RecommendationsTab;
