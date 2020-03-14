import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alert = ({ states: { alerts } }) => {
    let listAlerts = [];
    if (alerts !== null && alerts.length > 0) {
        alerts.forEach(alert => {
            const one = (
                <div key={alert.id} className='alert'>
                    {alert.msg}
                </div>
            );
            // return one;
            listAlerts.push(one);
        });
        return <section className='alerts'>{listAlerts}</section>;
    } else {
        return null;
    }
};

const mapStateToProps = state => ({
    states: state.states
});
export default connect(mapStateToProps, null)(Alert);
