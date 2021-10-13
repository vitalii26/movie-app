import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { signUp, selectRegisteredUsers } from "../../store/registrationSlice";
import InputField from "../InputField";
import FormButton from "../FormButton";
import styles from "./SignUpForm.module.css";

const SignUpSchema = Yup.object().shape({
  login: Yup.string()
    .min(6, "Login must be at least 6 characters")
    .required("Login is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Please enter a valid email"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectRegisteredUsers);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
        name: "",
        email: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setFieldError, resetForm }) => {
        if (users[values.login]) {
          return setFieldError(
            "login",
            "We already have a user with this login"
          );
        }

        dispatch(signUp(values));
        resetForm({});
        history.push("/signin");
      }}
    >
      {({ errors, touched }) => (
        <>
          <h2 className={styles.formTitle}>Please Sign Up</h2>
          <Form className={styles.form}>
            <InputField name="login" errors={errors} touched={touched} />
            <InputField name="password" errors={errors} touched={touched} />
            <InputField name="name" errors={errors} touched={touched} />
            <InputField name="email" errors={errors} touched={touched} />
            <FormButton>Sign Up</FormButton>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
