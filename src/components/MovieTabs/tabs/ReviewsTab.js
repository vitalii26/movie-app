import React from "react";
import { useGetMovieReviewsQuery } from "../../../store/api/moviesApiSlice";
import styles from "./ReviewsTab.module.css";

const ReviewsTab = ({ id }) => {
  const { data: reviews, isSuccess } = useGetMovieReviewsQuery(id);
  console.log(reviews);
  return (
    <ul className={styles.reviewsTab}>
      {isSuccess && reviews.length ? (
        reviews.map((review) => {
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
        })
      ) : (
        <div className={styles.reviewCardSubtitle}>
          There aren't any reviews
        </div>
      )}
    </ul>
  );
};

export default ReviewsTab;
