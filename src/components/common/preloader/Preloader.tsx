import React, { FC } from 'react';
import preloader from './../../../assets/images/preloader.svg';

type PropsType = {
  props?: null;
};

const Preloader: FC<PropsType> = (props) => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <img src={preloader} alt='' />
    </div>
  );
};

export default Preloader;
