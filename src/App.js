import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Results from './Results';


import './App.css';


const App = () =>   {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/results" component={Results} />
      </div>
    </Router>
  );
}




export default App;