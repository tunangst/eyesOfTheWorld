import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './logo.svg';
import './App.css';

import { loadUser } from './actions/userAction';

// import Navbar from '';
import Nav from './layout/Nav';
import LandingPage from './pages/LandingPage';
import AddPage from './pages/AddPage/AddPage';
import EyePage from './pages/EyePage';
import Register from './layout/RegisterModal';
import MyEyes from './pages/MyEyes';

import store from './store';

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <div id='myArea'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/register' component={Register} />
                        <Route path='/upload' component={AddPage} />
                        <Route path='/myEyes' component={MyEyes} />
                        <Route path='/eyes/:id' component={EyePage} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
