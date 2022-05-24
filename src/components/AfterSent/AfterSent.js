import React from "react";
import successImg from "../../images/success-image.svg";
import './AfterSent.scss';

const AfterSent = () => (
  <div className="after-sent">
    <div className="title">User successfully registered</div>
    <div>
      <img src={successImg} 
        className="after-sent__image" 
        alt="User successfully registered" />
    </div>
  </div>
)

export default AfterSent;