import React, { Component } from 'react';
// import axios from 'axios';
// import { Route, NavLink, Link, Switch } from 'react-router-dom';
import MoviesList from '../../components/MoviesList';
import MoviesApi from '../../services/movieApi';
import s from './Movies.module.css';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    const { search } = this.props.location;
    console.log(search);
    if (search) {
    MoviesApi.searchMovies(search.slice(7)).then(movies => this.setState({movies: movies}));
  }
}

  hanldeChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { location, history } = this.props;

    if (query.trim() === '') {
      alert('Try again');
      return;
    }

    MoviesApi.searchMovies(query).then(data => {
      this.setState({
        movies: data,
      });
    });
    history.push({ ...location, search: `query=${query}` });
  };

  // fetchMovie = query => {
  //   return axios
  //     .get(
  //       `https://api.themoviedb.org/3/search/movie?api_key=16793a08fc468099c942dee45d510578&language=en-US&query=${query}&page=1&include_adult=false`,
  //     )
  //     .then(response =>
  //       this.setState({
  //         movies: response.data.results,
  //       }),
  //     );
  // };

  render() {
    const { movies } = this.state;

    return (
      <div className={s.formThumb}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <input
            type="text"
            className={s.input}
            placeholder="Find movies"
            value={this.state.query}
            onChange={this.hanldeChange}
          />
          <button type="submit" className={s.btn}>
            Search
          </button>
        </form>

        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default Movies;
