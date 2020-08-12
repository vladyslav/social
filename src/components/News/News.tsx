import React, { FC } from 'react';
import s from './News.module.css';

type PropsType = {
  props: null;
};
const News: FC<PropsType> = (props) => {
  return (
    <div>
      <h1 className={s.header}>News</h1>
      <p>Welcome to the most recent news page</p>
    </div>
  );
};

export default News;
