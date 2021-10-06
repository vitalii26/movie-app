import styles from "./FormButton.module.css";

const FormButton = ({ children }) => {
  return (
    <button className={styles.button} type="submit">
      {children}
    </button>
  );
};

export default FormButton;
