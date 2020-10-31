import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import './assets/styles/index.scss';
import MovieDetail from './components/MovieDetail/MovieDetail';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/movie/:id' component={MovieDetail} exact />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
