import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ states: { alerts } }) => {
    let alertList = [];
    if (alerts !== null && alerts.length > 0) {
        alerts.forEach(alert =>
            alertList.push(
                <div
                    key={alert.id}
                    id={alert.id}
                    className={`alert ${alert.alertType}`}
                >
                    <h3>{alert.msg}</h3>
                </div>
            )
        );
    }
    return <section className='alerts'>{alertList || null}</section>;
};

const mapStateToProps = state => ({
    states: state.states
});
export default connect(mapStateToProps, null)(Alert);
