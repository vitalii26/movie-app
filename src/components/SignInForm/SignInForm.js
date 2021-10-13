import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signIn, selectRegisteredUsers } from "../../store/registrationSlice";
import InputField from "../InputField/";
import FormButton from "../FormButton";
import styles from "./SignInForm.module.css";

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(6, "Login must be at least 6 characters")
    .required("Login is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectRegisteredUsers);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={(values, { setFieldError, resetForm }) => {
        if (!users[values.login]) {
          return setFieldError("login", "User does not exist");
        }

        if (users[values.login].password !== values.password) {
          return setFieldError("password", "Your password is wrong");
        }

        dispatch(signIn(values));
        resetForm({});
        history.push("/");
      }}
    >
      {({ errors, touched }) => (
        <>
          <h2 className={styles.formTitle}>Please Sign In</h2>
          <Form className={styles.form}>
            <InputField name="login" errors={errors} touched={touched} />
            <InputField name="password" errors={errors} touched={touched} />
            <FormButton>Sign In</FormButton>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SignInForm;
