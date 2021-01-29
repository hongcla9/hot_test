import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Components/Home';
import HashtagInfo from './Components/HashtagInfo';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="container flex">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/hashtag/:id" component={HashtagInfo} />
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App;
