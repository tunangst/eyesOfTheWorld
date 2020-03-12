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
import Login from './layout/LoginModal';
import UserEyes from './pages/UserEyes';

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
                        <Route exact path='/login' component={Login} />
                        <Route path='/upload' component={AddPage} />
                        <Route path='/eyes/user/:user' component={UserEyes} />
                        <Route path='/eyes/:id' component={EyePage} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
