import React, { FC } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = { isAuth: boolean; login: string | null };
export type DispatchPropsType = { logout: () => void };

const Header: FC<MapPropsType & DispatchPropsType> = ({
  isAuth,
  login,
  logout
}) => {
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
