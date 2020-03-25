import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
    const { component: Component, user, ...rest } = props;
    const { isAuthenticated } = user;

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, null)(PrivateRoute);
