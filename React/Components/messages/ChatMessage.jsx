import React from 'react';
import PropTypes from 'prop-types';
import './Messages.css';
import ChatImage from './ChatImage';
import { Button } from 'reactstrap';

export default function ChatMessage(props) {
  return props.message.sender.userId === props.currentUser.userId ? (
    <li className="chat-item odd" key={props.message.id}>
      <div className="chat-content">
        <div className="box bg-light-info">
          {determineMessageOutput(props)}
          <i
            className="fa fa-times deletebtn"
            aria-label="Delete"
            onClick={() => props.onDeleteClicked(props.message)}
          ></i>
        </div>
      </div>
    </li>
  ) : (
    <li className="chat-item d-flex" key={props.message.id}>
      <div className="chat-img">
        <img
          src={
            props.message.sender.avatarUrl
              ? props.message.sender.avatarUrl
              : props.selectedContact.avatarUrl
          }
          alt={
            props.message.sender.firstName
              ? props.message.sender.firstName
              : props.selectedContact.firstName
          }
          width={40}
          height={40}
        />
      </div>
      <div className="pl-3">
        <div className="chat-content">
          <div className="box bg-light-info">
            {determineMessageOutput(props)}
          </div>
        </div>
      </div>
    </li>
  );
}

const determineMessageOutput = (props) => {
  let output = '';
  let text = props.message.messageText;
  let isUrl = isUrlOrFile(text);

  if (isUrl) {
    if (isUrl === 'IMAGE') {
      output = (
        <a href={text} target="_blank" rel="noopener noreferrer">
          <ChatImage src={text} />
        </a>
      );
    } else if (isUrl === 'PDF') {
      output = (
        <a href={text}>
          <i className="fas fa-file-pdf fa-5x"></i> {'   '}
          <small>{text}</small>
        </a>
      );
    } else if (isUrl === 'WORD') {
      output = (
        <a href={text}>
          <i className="fas fa-file-word fa-5x"></i> {'   '}
          <small>{text}</small>
        </a>
      );
    } else if (isUrl === 'VIDEOCHAT') {
      output = (
        <Button
          color="warning"
          onClick={() => props.joinVideoChat(props.videoChat)}
        >
          Join Video Chat
        </Button>
      );
    }
  } else {
    output = text;
  }

  return output;
};

const isUrlOrFile = (text) => {
  let response = false;
  const urlRegex =
    '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';
  let regex = new RegExp(urlRegex);
  if (regex.test(text)) {
    response = 'URL';
  }
  if (response) {
    const imageRegex = '.(gif|jpe?g|png|webp|svg)$';
    regex = new RegExp(imageRegex);
    if (regex.test(text)) {
      response = 'IMAGE';
    }
    const pdfRegex = '.(txt|pdf)$';
    regex = new RegExp(pdfRegex);
    if (regex.test(text)) {
      response = 'PDF';
    }
    const wordRegex = '.(doc|docx|xls)$';
    regex = new RegExp(wordRegex);
    if (regex.test(text)) {
      response = 'WORD';
    }
    const videoChatRegex = 'valorecaredev.daily.co';
    regex = new RegExp(videoChatRegex);
    if (regex.test(text)) {
      response = 'VIDEOCHAT';
    }
  }

  return response;
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.shape({
      userId: PropTypes.number,
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    recipient: PropTypes.shape({
      userId: PropTypes.number,
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    subject: PropTypes.string,
    messageText: PropTypes.string.isRequired,
    dateSent: PropTypes.string.isRequired,
    dateRead: PropTypes.string,
    dateModified: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.string,
  }),
  selectedContact: PropTypes.shape({
    userId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  onDeleteClicked: PropTypes.func.isRequired,
  videoChat: PropTypes.shape({
    url: PropTypes.string,
  }),
  joinVideoChat: PropTypes.func,
};
