import React from 'react';
import s from './MoviePreview.module.css';
import defaultBackdropImg from './defaultBackdropImg.jpg';

const MoviePreview = ({ title, backdrop_path }) => (
  <div className={s.card}>
    <img
      src={
        backdrop_path
          ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
          : defaultBackdropImg
      }
      alt={title}
      width="500"
      height="281"
    />
    <h2 className={s.title}>{title}</h2>
  </div>
);

export default MoviePreview;
