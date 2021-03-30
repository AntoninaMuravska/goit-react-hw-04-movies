import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import MoviesApi from '../../services/movieApi';
import routes from '../../routes';
import s from './MovieDetailsPage.module.css';
import defaultBackdropImg from '../../components/MoviePreview/defaultBackdropImg.jpg';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews" */),
);

class MovieDetailsPage extends Component {
  state = {
    genres: null,
    overview: null,
    poster_path: null,
    title: null,
    vote_average: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      this.setState({ ...(await MoviesApi.movieDetails(movieId)) });
    } catch (error) {
      console.log(error);
    }

    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/movie/${movieId}?api_key=16793a08fc468099c942dee45d510578&language=en-US`,
    // );
    // console.log(response.data);

    // this.setState({ ...response.data });
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);

    // console.log(location.state.from);

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { title, vote_average, overview, genres, poster_path } = this.state;
    const { match, location } = this.props;
    console.log(location.state.from);
    return (
      <div className={s.card}>
        <button type="button" className={s.btnBack} onClick={this.handleGoBack}>
          Back
        </button>
        <div className={s.thumb}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : defaultBackdropImg
            }
            alt=""
            className={s.img}
          />
          <div className={s.infoThumb}>
            <h2 className={s.title}>{title}</h2>
            <h3 className={s.secondaryTitle}>Rate</h3>
            <p className={s.info}>{vote_average}</p>
            <h3 className={s.secondaryTitle}>Overview</h3>
            <p className={s.info}>{overview}</p>
            {genres && (
              <div className={s.genres}>
                <h3 className={s.secondaryTitle}>Genres</h3>
                <ul className={s.genresList}>
                  {genres.map(genre => (
                    <li key={genre.id} className={s.genresItem}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <h3 className={s.secondaryTitle}>More info</h3>
        <ul className={s.moreInfoList}>
          <li className={s.moreInfoItem}>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: { ...location.state },
              }}
              className={s.link}
              activeClassName="NavLink--active"
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
                state: { ...location.state },
              }}
              className={s.link}
              activeClassName="NavLink--active"
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<b>Loading...</b>}>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;
