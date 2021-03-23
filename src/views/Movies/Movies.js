import React, { Component } from 'react';
import axios from 'axios';
// import { Route, NavLink, Link, Switch } from 'react-router-dom';
import MoviesList from '../../components/MoviesList';
import s from './Movies.module.css';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };

  hanldeChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (this.state.query.trim() === '') {
      alert('Try again');
      return;
    }

    this.setState({ query });
    this.fetchMovie(query);
  };

  fetchMovie = query => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=16793a08fc468099c942dee45d510578&language=en-US&query=${query}&page=1&include_adult=false`,
      )
      .then(response =>
        this.setState({
          movies: response.data.results,
        }),
      );
  };

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
          <button type="submit" className={s.btn}>Search</button>
        </form>

        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default Movies;
