import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = ({ isAuth, login, logout }) => {
  return (
    <header className={s.header}>
      <div>
        <h1>
          Not<span>Facebook</span>
        </h1>
      </div>
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login} - <button onClick={logout}>Log Out</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
