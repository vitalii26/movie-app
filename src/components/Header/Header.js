import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/main-logo.png";
import NavBar from "./navigation/NavBar";
import NavLinks from "./navigation/NavLinks";
import { selectIsSignedIn } from "../../store/registrationSlice";
import styles from "./Header.module.css";

const Header = () => {
  const signedIn = useSelector(selectIsSignedIn);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <img className={styles["header-logo"]} src={logo} alt="main-logo" />
        </Link>
        {signedIn ? <NavLinks /> : <NavBar />}
      </div>
    </header>
  );
};

export default Header;
