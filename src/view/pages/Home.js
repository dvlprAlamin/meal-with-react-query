import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CustomButton from '../../components/Custom/CustomButton';
import Loader from '../../components/Custom/Loader';
import SingleMeal from '../../components/Home/SingleMeal';
import './../../scss/home.scss'
const Home = () => {
    const { search: query } = useLocation();
    const [search, setSearch] = useState(query?.slice(2, 3))
    const searchRef = useRef();
    const history = useHistory();
    const fetcher = (search) => axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`).then(res => res.data)


    const { data, isLoading, isSuccess } = useQuery(['meals', search], () => fetcher(search), {
        enabled: !!search
    });
    const handleSubmit = e => {
        e.preventDefault();
        setSearch(searchRef.current.value)
        history.push(`/meals?=${searchRef.current.value}`)
    }
    return (
        <div className='home__page__style'>
            <form onSubmit={handleSubmit} className="search__options">
                <input required ref={searchRef} type="text" placeholder='Search meals by first letter' />
                <div className='search__button'>
                    <CustomButton type="submit">Search</CustomButton>
                </div>
            </form>
            {

                isLoading ? <Loader /> :
                    (isSuccess && data.meals) &&
                    <div className='meals__container container'>
                        {
                            data.meals.map(meal => (
                                <SingleMeal key={meal.idMeal} meal={meal} />
                            ))
                        }
                    </div>
            }
            {
                (isSuccess && !data) && <h1 className='no__meals__found'>No Meals Found!</h1>
            }
        </div>
    );
};

export default Home;