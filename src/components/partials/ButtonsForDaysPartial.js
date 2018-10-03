import React from 'react'
import _ from 'lodash'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ButtonsForDaysPartial = (props) => {
    let dayButtons;
    if(props.completeDays.length === 31) // eslint-disable-line
    {
        dayButtons = _.times(31, i => (
            <Button active={props.currentlyEditedDay===i+1}  negative={!props.completeDays[i]} positive={props.completeDays[i]} onClick={()=>{props.setDay(i+1)}}>{i+1}</Button>
        ));
    }
    return (
        <Button.Group vertical>
            {dayButtons}
        </Button.Group>
    );
};

ButtonsForDaysPartial.propTypes = {
    completeDays: PropTypes.shape({
        completeDays: PropTypes.array.isRequired
    }).isRequired,
    setDay: PropTypes.func.isRequired,
    currentlyEditedDay: PropTypes.number.isRequired // eslint-disable-line
}

export default ButtonsForDaysPartial;