import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import history from "./utils/history";
import ErrorBoundry from "./components/ErrorBoundry";
import Header from "./components/Header";
import PrivateRoute from "./components/containers/PrivateRoute";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import HistoryPage from "./pages/HistoryPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import { initApp } from "./store/initAppSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  return (
    <ErrorBoundry>
      <div className="App">
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute path="/favourites" component={FavouritesPage} />
            <PrivateRoute path="/history" component={HistoryPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route
              render={() => <h2 className="App-title">Page not found</h2>}
            />
          </Switch>
        </Router>
      </div>
    </ErrorBoundry>
  );
}

export default App;
