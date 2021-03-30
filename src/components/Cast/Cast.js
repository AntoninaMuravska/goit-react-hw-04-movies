import React, { Component } from 'react';
import MoviesApi from '../../services/movieApi';
import defaultImage from '../../images/defaultImage.jpg';
import s from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    try {
      this.setState({ ...(await MoviesApi.movieCast(movieId)) });
    } catch (error) {
      console.log(error);
    }

    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=16793a08fc468099c942dee45d510578&language=en-US`,
    // );
    // // console.log(response.data);

    // this.setState({cast: response.data.cast });
  }

  render() {
    const { cast } = this.state;

    return (
      <ul className={s.list}>
        {cast.map(el => {
          return (
            <li key={el.credit_id} className={s.item}>
              <img
                src={
                  el.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                    : `${defaultImage}`
                }
                alt={el.name}
                width="120"
              />
              <p className={s.name}>{el.name}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cast;
