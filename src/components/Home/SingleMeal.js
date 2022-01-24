import React from 'react';
import './../../scss/singleMeal.scss'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const SingleMeal = ({ meal }) => {
    const { search } = useLocation();
    return (
        <Link to={`/meal/${meal.idMeal}${search}`} className='single__meal'>
            <img src={meal.strMealThumb} alt="" />
            <h3>{meal.strMeal}</h3>
        </Link>
    );
};

export default SingleMeal;