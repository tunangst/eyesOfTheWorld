import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-transition-group';

import { removeAlert } from '../actions/statesAction';

const CSSTransitionGroup = ReactCSSTransitionGroup.CSSTransitionGroup;

const Alert = ({ states: { alerts }, removeAlert }) => {
    let alertList = [];
    if (alerts !== null && alerts.length > 0) {
        alerts.forEach((alert) =>
            alertList.push(
                <div
                    key={alert.id}
                    id={alert.id}
                    className={`alert ${alert.alertType}`}
                    onClick={() => removeAlert(alert.id)}
                >
                    <h3>{alert.msg}</h3>
                    <p className='remove'>X</p>
                </div>
            )
        );
    }
    return (
        <section className='alerts'>
            <CSSTransitionGroup
                transitionName='alertAnimation'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {alertList || null}
            </CSSTransitionGroup>
        </section>
    );
};

const mapStateToProps = (state) => ({
    states: state.states,
});
export default connect(mapStateToProps, { removeAlert })(Alert);
