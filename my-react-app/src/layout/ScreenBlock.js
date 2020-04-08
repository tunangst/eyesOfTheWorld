import React from 'react';
import { connect } from 'react-redux';

const ScreenBlock = ({ states: { loading } }) => {
    const noBlock = null;
    const block = <aside className='screenBlock' />;
    return loading ? block : noBlock;
};

const mapStateToProps = state => ({
    states: state.states
});
export default connect(mapStateToProps, null)(ScreenBlock);
