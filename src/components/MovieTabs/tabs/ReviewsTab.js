import React from "react";
import PropTypes from "prop-types";
import { useGetMovieReviewsQuery } from "../../../store/api/moviesApiSlice";
import ErrorIndicator from "../../ErrorIndicator";
import Spinner from "../../Spinner";
import styles from "./ReviewsTab.module.css";

const ReviewsTab = ({ id }) => {
  const {
    data: reviewsData,
    isSuccess,
    isLoading,
    isError,
  } = useGetMovieReviewsQuery(id);

  return (
    <ul className={styles.reviewsTab}>
      {isLoading && <Spinner />}

      {isError && <ErrorIndicator />}

      {isSuccess &&
        reviewsData.length > 0 &&
        reviewsData.map((review) => {
          return (
            <li className={styles.reviewsTabItem} key={review.id}>
              <div className={styles.reviewCard}>
                <img
                  className={styles.reviewCardImg}
                  src={review.avatar}
                  alt={review.title}
                />
                <div className={styles.reviewCardContent}>
                  <h4 className={styles.reviewCardSubtitle}>Featured Review</h4>
                  <a
                    className={styles.reviewCardLink}
                    href={review.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    A review by {review.author}
                  </a>
                  <span className={styles.reviewCardDate}>
                    Written by {review.author} on September 4, 2017
                  </span>
                  <p className={styles.reviewCardText}>{review.content}</p>
                </div>
              </div>
            </li>
          );
        })}

      {isSuccess && reviewsData.length < 1 && (
        <div className={styles.reviewCardSubtitle}>
          There aren't any reviews
        </div>
      )}
    </ul>
  );
};

ReviewsTab.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ReviewsTab;
