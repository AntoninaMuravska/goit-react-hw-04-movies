import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MoviePreview from '../MoviePreview';
import s from './MoviesList.module.css';
import PropTypes from 'prop-types';

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={s.list}>
      {movies.map(({ id, title, backdrop_path }) => (
        <li key={id} className={s.item}>
          <Link
            to={{ pathname: `movies/${id}`, state: { from: location } }}
            className={s.link}
          >
            <MoviePreview id={id} title={title} backdrop_path={backdrop_path} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default withRouter(MoviesList);
