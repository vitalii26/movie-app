import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { signedInSelector } from "../../store/registrationSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const signedIn = useSelector(signedInSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
