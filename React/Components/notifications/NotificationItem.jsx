import React from 'react';
import PropTypes from 'prop-types';

export default function NotificationItem(props) {
  const determineIcon = (notificationType) => {
    switch (notificationType) {
      case 1: {
        //Appointments
        return 'fa fa-calendar-check';
      }
      case 2: {
        //Messages
        return 'fa fa-comment-dots';
      }

      default: {
        return 'fa fa-link';
      }
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    switch (props.notificationTypeId) {
      case 1: {
        //Appointments
        props.toggle();
        return props.history.push('/appointments');
      }
      case 2: {
        //Messages
        props.toggle();
        return props.history.push('/messages');
      }

      default: {
        props.toggle();
        return 'fa fa-link';
      }
    }
  };

  return (
    <>
      <span className="message-item" onClick={handleClick}>
        <span className="btn btn-circle btn-primary">
          <i className={determineIcon(props.notificationTypeId)} />
        </span>
        <div className="mail-contnet">
          <h5 className="message-title">{props.notificationText}</h5>
          <span className="time">
            {new Date(props.dateCreated).toLocaleString()}
          </span>
        </div>
      </span>
    </>
  );
}

NotificationItem.propTypes = {
  notificationTypeId: PropTypes.number,
  notificationText: PropTypes.string,
  dateCreated: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  toggle: PropTypes.func,
};
