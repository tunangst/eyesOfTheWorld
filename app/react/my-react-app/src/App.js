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
import UserEyes from './pages/UserEyes';
import Register from './layout/RegisterModal';
import Login from './layout/LoginModal';
import SuggestionBar from './layout/SuggestionBar';
import Alert from './layout/Alert';

import PrivateRoute from './extra/utilityFunctions/PrivateRoute';
import ScreenBlock from './layout/ScreenBlock';

import store from './store';

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <div id='myArea'>
                    <ScreenBlock />
                    <Nav />
                    <Alert />
                    <SuggestionBar />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <PrivateRoute path='/upload' component={AddPage} />
                        <Route path='/eyes/user/:user' component={UserEyes} />
                        <Route path='/eyes/:id' component={EyePage} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
