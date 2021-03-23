import React, { Component } from 'react';
import axios from 'axios';
import MoviesList from '../../components/MoviesList'
import s from './HomePage.module.css';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=16793a08fc468099c942dee45d510578',
    );
    // console.log(response.data.results);

    this.setState({movies: response.data.results})
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
