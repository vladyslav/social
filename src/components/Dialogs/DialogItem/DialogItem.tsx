import React, { FC } from 'react';
import s from './DialogsItem.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
  id: number;
  name: string;
};

const DialogItem: FC<PropsType> = ({ id, name }) => {
  let path = '/dialogs/' + id;

  return (
    <div>
      <NavLink activeClassName={s.activeLink} className={s.link} to={path}>
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
