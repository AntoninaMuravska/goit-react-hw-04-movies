import React, { Component } from 'react';
// import axios from 'axios';
import MoviesList from '../../components/MoviesList';
import s from './HomePage.module.css';
import MoviesApi from '../../services/movieApi';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      this.setState({
        movies: await MoviesApi.getPopular(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movies } = this.state;
    //   console.log(this.props.match.url)
    return (
      <div className={s.thumb}>
        <h1 className={s.title}>Popular movies</h1>
        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default HomePage;
