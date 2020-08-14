import React, { FC } from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string;
  likes: number;
};
const Post: FC<PropsType> = ({ message, likes }) => {
  return (
    <div className={s.item}>
      <img src='https://i.imgur.com/IzXy2T5g.jpg' alt='' />
      {message}
      <div>
        <span>likes: {likes}</span>
      </div>
    </div>
  );
};

export default Post;
