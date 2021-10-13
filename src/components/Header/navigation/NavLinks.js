import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOut,
  selectCurrentUserName,
} from "../../../store/registrationSlice";
import styles from "./NavLinks.module.css";

const NavLinks = () => {
  const dispatch = useDispatch();
  const currentUserName = useSelector(selectCurrentUserName);

  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <div className={styles.nav}>
      <nav>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.active}
          to="/favourites"
        >
          Favourites
        </NavLink>
        <NavLink
          className={styles.navLink}
          activeClassName={styles.active}
          to="/history"
        >
          History
        </NavLink>
      </nav>
      <div>
        <span className={styles.userName}>{currentUserName}</span>
        <button onClick={signOutHandler} className={styles.exitBtn}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default NavLinks;
