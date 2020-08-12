import React, { FC } from 'react';
import s from './Settings.module.css';

type PropsType = {
  props: null;
};
const Settings: FC<PropsType> = (props) => {
  return (
    <div>
      <h1 className={s.header}>Settings</h1>
      <p>This page is supposed to let user to change some settings</p>
    </div>
  );
};

export default Settings;
