import React, { Component } from 'react';
import MoviesApi from '../../services/movieApi';
import s from './Reviews.module.css'

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({ reviews: await MoviesApi.movieReviews(movieId) }
    )
    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=16793a08fc468099c942dee45d510578&language=en-US&page=1`,
    // );
    // console.log(response.data);

    // this.setState({ reviews: response.data.results });
  }

  render() {
    const { reviews } = this.state;
    return reviews.length > 0 ? (
      <ul>
        {reviews.map(el => {
          return (
            <li key={el.id}>
              <p className={s.author}>Author: {el.author}</p>
              <p className={s.content}>{el.content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>We can't find any rewiews for this movie</p>
    );
  }
}

export default Reviews;
