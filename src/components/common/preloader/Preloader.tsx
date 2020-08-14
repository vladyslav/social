import React, { FC } from 'react';
import preloader from './../../../assets/images/preloader.svg';

const Preloader: FC = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <img src={preloader} alt='' />
    </div>
  );
};

export default Preloader;
