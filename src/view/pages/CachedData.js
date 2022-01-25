import React from 'react';
import { useLocation } from 'react-router-dom';
import SingleMeal from '../../components/Home/SingleMeal';
import { client } from '../../query-client';

const CachedData = () => {
    const { search } = useLocation();
    const cache = client.getQueryData(['meals', search?.slice(2, 3)]);
    return (
        <div className="container">
            <h1>Hello Cache</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
                {
                    cache?.meals?.map(meal => (
                        <SingleMeal key={meal.idMeal} meal={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default CachedData;