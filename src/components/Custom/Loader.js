import React from 'react';
import loaderImg from './../../assets/animation/loader.gif';
import './../../scss/loader.scss'
const Loader = () => {
    return (
        <div className='loading__spinner'>
            <img src={loaderImg} alt="" />
        </div>
    );
};

export default Loader;