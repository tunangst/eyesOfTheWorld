import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SuggestedEye from '../extra/utilityFunctions/SuggestedEye';
import { toggleSuggestion } from '../actions/tabsAction';

import icons from '../extra/images/icons.svg';

const SuggestionBar = props => {
    const {
        eyes,
        tabs: { suggestions },
        toggleSuggestion
    } = props;
    console.log(suggestions);

    let suggestedEyes = [];

    if (suggestions) {
        if (eyes !== null && eyes.length > 0) {
            if (eyes.length < 10) {
                for (let i = 0; i < eyes.length; i++) {
                    suggestedEyes.push(<SuggestedEye key={i} eye={eyes[i]} />);
                }
            } else {
                for (let i = 0; i < 10; i++) {
                    suggestedEyes.push(<SuggestedEye key={i} eye={eyes[i]} />);
                }
            }
        }
    }

    useEffect(() => {
        console.log('running useEffect in suggestionBar');
        //find close eyes
    }, []);

    return suggestions ? (
        <aside className='suggestionOpen'>
            <svg className='icon' onClick={() => toggleSuggestion()}>
                <use href={`${icons}#up`}></use>
            </svg>
            {suggestedEyes}
        </aside>
    ) : (
        <aside className='suggestionClosed'>
            <svg className='icon' onClick={() => toggleSuggestion()}>
                <use href={`${icons}#down`}></use>
            </svg>
        </aside>
    );
};

const mapStateToProps = state => ({
    eyes: state.eyes,
    tabs: state.tabs
});
export default connect(mapStateToProps, { toggleSuggestion })(SuggestionBar);
