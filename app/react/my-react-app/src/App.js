import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

// import Navbar from '';
import Nav from './layout/Nav';
import LandingPage from './pages/LandingPage';
import AddPage from './pages/AddPage/AddPage';

function App() {
    return (
        <Router>
            <div id='myArea'>
                <Nav />
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/upload' component={AddPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
