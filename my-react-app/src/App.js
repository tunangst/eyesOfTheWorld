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
import MyUserEyes from './pages/MyUserEyes';
import Register from './layout/RegisterModal';
import Login from './layout/LoginModal';
import SuggestionBar from './layout/SuggestionBar';
import Alert from './layout/Alert';
import Profile from './layout/Profile';

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
                <ScreenBlock />
                <Nav />
                <Alert />
                <div id='myArea'>
                    <SuggestionBar />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <PrivateRoute path='/upload' component={AddPage} />
                        <Route path='/eyes/user/:user' component={UserEyes} />

                        <PrivateRoute
                            path='/eyes/myUser/:user'
                            component={MyUserEyes}
                        />

                        <Route path='/user/:userid' component={Profile} />
                        <Route path='/eyes/:id' component={EyePage} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
