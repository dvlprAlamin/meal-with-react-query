import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CachedData from './view/pages/CachedData';
import Home from './view/pages/Home';
import MealDetails from './view/pages/MealDetails';
import NotFound from './view/pages/NotFound';
import Posts from './view/pages/Posts';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/meals'} component={Home} />
        <Route path={'/meal/:id'} component={MealDetails} />
        <Route path={'/cached'} component={CachedData} />
        <Route path={'/posts'} component={Posts} />
        <Route path={'*'} component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;