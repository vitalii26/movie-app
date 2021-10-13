import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectIsSignedIn } from "../../store/registrationSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const signedIn = useSelector(selectIsSignedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType,
  rest: PropTypes.any,
};

export default PrivateRoute;
