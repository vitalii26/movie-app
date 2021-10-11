import React from "react";
import { Link } from "react-router-dom";
import { useGetMovieRecommendationsQuery } from "../../../store/api/moviesApiSlice";
import styles from "./RecommendationsTab.module.css";

const RecommendationsTab = ({ id }) => {
  const { data: recommendations, isSuccess } =
    useGetMovieRecommendationsQuery(id);

  return (
    <ul className={styles.recommendationsTab}>
      {isSuccess && recommendations.length ? (
        recommendations.map((rec) => {
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
        })
      ) : (
        <div className={styles.recommendationCardText}>
          There aren't any recommendations
        </div>
      )}
    </ul>
  );
};

export default RecommendationsTab;
