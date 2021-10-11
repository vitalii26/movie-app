import React from "react";
import { useGetMovieActorsQuery } from "../../../store/api/moviesApiSlice";
import styles from "./ActorsTab.module.css";

const ActorsTab = ({ id }) => {
  const { data: actors, isSuccess } = useGetMovieActorsQuery(id);

  return (
    <ul className={styles.actorTab}>
      {isSuccess && actors.length ? (
        actors.map((actor) => {
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
        })
      ) : (
        <div className={styles.actorsCardText}>
          There aren't any data about actors
        </div>
      )}
    </ul>
  );
};

export default ActorsTab;
