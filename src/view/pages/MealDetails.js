import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import CustomButton from '../../components/Custom/CustomButton';
import Loader from '../../components/Custom/Loader';
import './../../scss/mealDetails.scss';
import NotFound from './NotFound';
const MealDetails = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const fetcher = () => axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.data?.meals?.[0])
    const { data, isLoading } = useQuery(['meal', id], fetcher);

    if (isLoading) return <Loader />
    const { strMealThumb, strMeal, strArea, strCategory, strInstructions } = data || {}
    if (data) {
        const propertyValues = Object.values(data);
        // slice ingredient part from the array
        const ingredientsArray = propertyValues.slice(9, 29);
        // remove empty and null value from array
        const ingredients = ingredientsArray.filter(item => item);
        const measureArray = propertyValues.slice(29, 49);
        const measure = measureArray.filter(item => item);
        return (
            <div className="meal__details__page">
                <div className="container">

                    <Link to={`/meals${search}`}><CustomButton>Go Back</CustomButton></Link>
                    <div className="meal__details">
                        <div className="meal__img">
                            <img src={strMealThumb} alt="" />
                        </div>
                        <div className="meal__info">
                            <h1>{strMeal}</h1>
                            <p><span> Category:</span> {strCategory} | <span> Nation: </span> {strArea}</p>
                            <h2>Ingredients:</h2>
                            <div className="ingredients_measure">
                                <ul className="ingredients__list">
                                    {
                                        ingredients.map((ingredient, i) => <li key={i}> {ingredient}</li>)
                                    }
                                </ul>
                                <ul className="measure__list">
                                    {
                                        measure.map((measure, i) => <li key={i}> {measure}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="instruction">
                        <h2>Instruction</h2>
                        <p>{strInstructions}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <NotFound />
    }


};

export default MealDetails;