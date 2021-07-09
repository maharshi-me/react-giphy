import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import './App.css';

class App extends Component {
  render() {
    return (
    	<Router>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
      	</Router>
    );
  }
}

export default App;