import React from "react";
import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import PageContainer from "../containers/PageContainer";
import ActorsTab from "./tabs/ActorsTab";
import RecommendationsTab from "./tabs/RecommendationsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import styles from "./MovieTabs.module.css";

const MovieTabs = () => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();

  return (
    <PageContainer>
      <div className={styles.tabs}>
        <h2 className={styles.tabsTitle}>Details</h2>
        <ul className={styles.tabsList}>
          <li>
            <NavLink
              to={`${url}/actors`}
              className={styles.tabsLink}
              activeClassName={styles.active}
            >
              Actors
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/reviews`}
              className={styles.tabsLink}
              activeClassName={styles.active}
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/recommendations`}
              className={styles.tabsLink}
              activeClassName={styles.active}
            >
              Recommendations
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a tab.</h3>
        </Route>
        <Route path={`${path}/actors`}>
          <ActorsTab id={id} />
        </Route>
        <Route path={`${path}/reviews`}>
          <ReviewsTab id={id} />
        </Route>
        <Route path={`${path}/recommendations`}>
          <RecommendationsTab id={id} />
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default MovieTabs;
