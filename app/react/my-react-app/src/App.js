import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import logo from './logo.svg';
import './App.css';

// import Navbar from '';
import Nav from './layout/Nav';
import LandingPage from './pages/LandingPage';
import AddPage from './pages/AddPage/AddPage';
import EyePage from './pages/EyePage';

import store from './store';

const App = () => {
    // useEffect(() => {
    //     store.dispatch(loadUser());
    // }, []);
    return (
        <Provider store={store}>
            <Router>
                <div id='myArea'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route path='/upload' component={AddPage} />
                        <Route path='/eyes/:id' component={EyePage} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
