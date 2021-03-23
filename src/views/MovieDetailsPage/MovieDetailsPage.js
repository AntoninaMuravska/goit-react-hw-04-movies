import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import axios from 'axios';
import routes from '../../routes';
import s from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  state = {
    adult: null,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: null,
    genres: null,
    homepage: null,
    id: null,
    imdb_id: null,
    original_language: null,
    original_title: null,
    overview: null,
    popularity: null,
    poster_path: null,
    production_companies: null,
    production_countries: null,
    release_date: null,
    revenue: null,
    runtime: null,
    spoken_languages: null,
    status: null,
    tagline: null,
    title: null,
    video: null,
    vote_average: null,
    vote_count: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=16793a08fc468099c942dee45d510578&language=en-US`,
    );
    // console.log(response.data);

    this.setState({ ...response.data });
  }

  handleGoBack = () => {
    const {location, history} = this.props;
    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }
    // history.push(routes.home);

    history.push(location?.state?.from || routes.home)
  }

  render() {
    const { title, vote_average, overview, genres, poster_path } = this.state;
    const { match } = this.props;
    return (
      <div className={s.card}>
        <button
          type="button"
          className={s.btnBack}
          onClick={this.handleGoBack}
        >
          Back
        </button>
        <div className={s.thumb}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
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
              to={`${match.url}/cast`}
              className={s.link}
              activeClassName="NavLink--active"
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${match.url}/reviews`}
              className={s.link}
              activeClassName="NavLink--active"
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Switch>
      </div>
    );
  }
}

export default MovieDetailsPage;
