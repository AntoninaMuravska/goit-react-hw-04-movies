import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
// import HomePage from './views/HomePage';
// import Movies from './views/Movies';
import NotFaund from './views/NotFaund';
// import MovieDetailsPage from './views/MovieDetailsPage';
import AppBar from './components/AppBar';
import routes from './routes';

import './App.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const Movies = lazy(() =>
  import('./views/Movies' /* webpackChunkName: "movies" */),
);

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Suspense fallback={<h1>Loading...</h1> }>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route path={routes.movieDetails} component={MovieDetailsPage} />
            <Route path={routes.movies} component={Movies} />
            <Route component={NotFaund} />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
