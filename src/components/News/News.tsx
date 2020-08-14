import React, { FC } from 'react';
import s from './News.module.css';

const News: FC = () => {
  return (
    <div>
      <h1 className={s.header}>News</h1>
      <p>Welcome to the most recent news page</p>
    </div>
  );
};

export default News;
