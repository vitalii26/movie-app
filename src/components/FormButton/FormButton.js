import PropTypes from "prop-types";
import styles from "./FormButton.module.css";

const FormButton = ({ children }) => {
  return (
    <button className={styles.button} type="submit">
      {children}
    </button>
  );
};

FormButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default FormButton;
