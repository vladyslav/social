import React from 'react';
import s from './Friends.module.css';

const Friends = (props) => {
  let friends = props.state.friends.map((f) => (
    <li key={f.id}>
      <img className={s.friendIMG} src={f.img} alt=''></img>
      {f.name}
    </li>
  ));

  return (
    <div>
      <h2 className={s.header}>Friends</h2>
      <ul className={s.list}>{friends}</ul>
    </div>
  );
};

export default Friends;
