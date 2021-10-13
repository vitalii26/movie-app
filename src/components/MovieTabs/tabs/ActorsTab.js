import React from "react";
import PropTypes from "prop-types";
import { useGetMovieActorsQuery } from "../../../store/api/moviesApiSlice";
import Spinner from "../../Spinner";
import ErrorIndicator from "../../ErrorIndicator";
import styles from "./ActorsTab.module.css";

const ActorsTab = ({ id }) => {
  const {
    data: actorsData,
    isSuccess,
    isLoading,
    isError,
  } = useGetMovieActorsQuery(id);

  return (
    <ul className={styles.actorTab}>
      {isLoading && <Spinner />}

      {isError && <ErrorIndicator />}

      {isSuccess &&
        actorsData.length > 0 &&
        actorsData.map((actor) => {
          return (
            <li key={actor.id} className={styles.actorTabItem}>
              <div className={styles.actorCard}>
                <div className={styles.actorCardImgWrapper}>
                  <img
                    className={styles.actorCardImg}
                    src={actor.img}
                    alt={actor.name}
                  />
                </div>
                <div className={styles.actorCardDescrition}>
                  <h4 className={styles.actorCardTitle}>{actor.name}</h4>
                  <span className={styles.actorCardCharacter}>
                    {actor.character}
                  </span>
                </div>
              </div>
            </li>
          );
        })}

      {isSuccess && actorsData.length < 1 && (
        <div className={styles.actorsCardText}>
          There aren't any data about actors
        </div>
      )}
    </ul>
  );
};

ActorsTab.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActorsTab;
