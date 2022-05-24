import React from 'react';
import "./Header.scss";
import logo from '../../images/Logo.svg';
import { scroller } from 'react-scroll';

const Header = () => {
    return (
        <div className='header'>
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-logo">
                        <a href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="header-navigation">
                        <button 
                            className='page-button'
                            onClick={() => {
                                scroller.scrollTo('users', {
                                duration: 1000,
                                delay: 0,
                                smooth: true,
                                });
                            }}
                            >Users
                        </button>
                        <button 
                            className='page-button'
                            onClick={() => {
                                scroller.scrollTo('signup', {
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
        </div>
    );
}

export default Header;