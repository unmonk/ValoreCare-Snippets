import React from 'react';
import PropTypes from 'prop-types';

export default function EventStepper(props) {
  const determineProgressClassname = (stepId) => {
    const wizardStep = props.wizardStep;
    let className = 'progtrckr-todo';
    if (stepId === wizardStep) {
      className = 'progtrckr-doing';
    } else if (stepId < wizardStep) {
      className = 'progtrckr-done';
    }
    return className;
  };
  return (
    <ol className="progtrckr">
      <li className={determineProgressClassname(0)} value={0}>
        <span>Venue Details</span>
      </li>
      <li className={determineProgressClassname(1)} value={1}>
        <span>Event Details</span>
      </li>
      <li className={determineProgressClassname(2)} value={2}>
        <span>Done</span>
      </li>
    </ol>
  );
}

EventStepper.propTypes = {
  wizardStep: PropTypes.number,
};
