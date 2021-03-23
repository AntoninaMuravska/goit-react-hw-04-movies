import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={s.menu}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            exact
            className={s.navLink}
            activeClassName="NavLink--active"
            to={routes.home}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={s.navLink}
            activeClassName="NavLink--active"
            to={routes.movies}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
