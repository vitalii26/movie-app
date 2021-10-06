import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/main-logo.png";
import NavBar from "../NavBar";
import NavLinks from "../NavLinks";
import { signedInSelector } from "../../store/registrationSlice";
import styles from "./Header.module.css";

const Header = () => {
  const signedIn = useSelector(signedInSelector);

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
