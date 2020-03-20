import React from 'react';
import { connect } from 'react-redux';

import { removeAlert } from '../actions/statesAction';

const Alert = ({ states: { alerts }, removeAlert }) => {
    let alertList = [];
    if (alerts !== null && alerts.length > 0) {
        alerts.forEach(alert =>
            alertList.push(
                <div
                    key={alert.id}
                    id={alert.id}
                    className={`alert ${alert.alertType}`}
                    onClick={() => removeAlert(alert.id)}
                >
                    <h3>{alert.msg}</h3>
                    <p>X</p>
                </div>
            )
        );
    }
    return <section className='alerts'>{alertList || null}</section>;
};

const mapStateToProps = state => ({
    states: state.states
});
export default connect(mapStateToProps, { removeAlert })(Alert);
