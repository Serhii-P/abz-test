import React from 'react';
import './MainDescription.scss';
import { scroller } from 'react-scroll';

 const MainDescription = () => {
  return (
    <div className='container-xl'>
      <div className="main-description__block">
        <div className="wrapper">
          <h1 className='title'>Test assignment for front-end developer</h1>
          <p className='text'>What defines a good front-end developer is one that 
            has skilled knowledge of HTML, CSS, JS with a vast 
            understanding of User design thinking as they'll be 
            building web interfaces with accessibility in mind. 
            They should also be excited to learn, 
            as the world of Front-End Development keeps evolving.</p>
          <button 
            className='page-button'
            onClick={() => {
              scroller.scrollTo('users', {
              duration: 1000,
              delay: 0,
              smooth: true,
              });
            }}
            >Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainDescription;