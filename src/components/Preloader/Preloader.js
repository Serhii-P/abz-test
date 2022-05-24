import React from 'react';
import './Preloader.scss';

const Preloader = () => (
  <div className="preloader-container">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Preloader;