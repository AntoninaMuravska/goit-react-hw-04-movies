import React from 'react';
import s from './MoviePreview.module.css';

const MoviePreview = ({ title, backdrop_path }) => (
  <div className={s.card}>
    <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={title} />
    <h2 className={s.title}>{title}</h2>
  </div>
);

export default MoviePreview;
