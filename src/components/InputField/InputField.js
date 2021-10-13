import classNames from "classnames";
import { Field } from "formik";
import PropTypes from "prop-types";
import styles from "./InputField.module.css";

const InputField = ({ name, errors, touched }) => {
  const fieldClassNames = classNames(styles.input, {
    [styles.inputError]: errors?.[name] && touched?.[name],
  });

  const errorClassNames = classNames(styles.error, {
    [styles.open]: errors?.[name] && touched?.[name],
  });

  const inputType =
    name === "password" ? "password" : name === "email" ? "email" : "text";

  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <Field
        className={fieldClassNames}
        type={inputType}
        id={name}
        name={name}
      />
      <span className={errorClassNames}>{errors[name]}.</span>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default InputField;
