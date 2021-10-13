import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <ul className={styles.navbarList}>
      <li styles={styles.navbarItem}>
        <Link className={styles.navbarLink} to="/signin">
          Sign In
        </Link>
      </li>
      <li>
        <Link className={styles.navbarLink} to="/signup">
          Sign Up
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
