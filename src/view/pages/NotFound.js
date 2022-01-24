import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/Custom/CustomButton';
import notFoundImg from './../../assets/images/not-found.png';
import './../../scss/notFound.scss';
const NotFound = () => {
    return (
        <div className='not__found__page container'>
            <div className='not__found'>
                <h1>Page Not Found</h1>
                <Link to={'/'}><CustomButton>Go Back</CustomButton></Link>
            </div>
            <div className="not__found_img">
                <img src={notFoundImg} alt="" />
            </div>
        </div>
    );
};

export default NotFound;