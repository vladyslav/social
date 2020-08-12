import React, { FC } from 'react';
import s from './Music.module.css';

type PropsType = {
  props: null;
};

const Music: FC<PropsType> = (props) => {
  return (
    <div>
      <h1 className={s.header}>Music</h1>
      <p>asdasdas</p>
    </div>
  );
};

export default Music;
