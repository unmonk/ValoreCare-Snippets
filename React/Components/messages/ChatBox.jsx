import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import ViewProfileDropdown from './ViewProfileDropdown';
import { Popover, PopoverBody, PopoverHeader, Button } from 'reactstrap';
import Files from '../files/Files';
import logger from 'sabio-debug';
import VideoChatFrame from './VideoChatFrame';
import Anon from '../../assets/images/users/1.jpg';
const _logger = logger.extend('App');
export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: '',
      showDeleteAlert: false,
      messageToDelete: null,
      userId: process.env.REACT_APP_TEMP_USER_ID,
      attachmentPopover: false,
    };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  addDefaultSrc(ev) {
    ev.target.src = Anon;
  }

  send = () => {
    const name = `${this.props.selectedContact.firstName} ${this.props.selectedContact.lastName}`;
    this.props.sendMessage(
      this.state.sendMessage,
      this.props.selectedContact.userId,
      name
    );
    this.setState((prevState) => {
      return {
        ...prevState,
        sendMessage: '',
      };
    });
  };

  onSendMessageChange = (e) => {
    this.setState({ sendMessage: e.target.value });
  };

  onSendKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.send();
    }
  };

  onSendButtonPressed = (e) => {
    e.preventDefault();
    this.send();
  };

  onDeleteCanceled = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showDeleteAlert: false,
        message: null,
      };
    });
  };

  onDeleteClicked = (message) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showDeleteAlert: true,
        messageToDelete: message,
      };
    });
  };

  onDeleteConfirmed = () => {
    this.props.sendDeleteMessage(this.state.messageToDelete.id);
    this.setState((prevState) => {
      return {
        ...prevState,
        showDeleteAlert: false,
        messageToDelete: null,
      };
    });
  };

  onGetFileUpload = (fileUrl) => {
    if (fileUrl) {
      _logger(fileUrl[0]);
      this.props.sendMessage(fileUrl[0], this.props.selectedContact.userId);
      this.toggleAttachmentPopover();
    } else {
      this.props.onGenericError('Image Upload Failed');
    }
  };

  scrollToBottom() {
    const scrollHeight = this.chatList.scrollHeight;
    this.chatList.scrollTop = scrollHeight;
  }

  toggleAttachmentPopover = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        attachmentPopover: !this.state.attachmentPopover,
      };
    });
  };

  render() {
    return (
      <div className="right-part bg-white">
        <div>
          <span
            className={
              this.props.isShowContacts
                ? 'bg-primary show-left-part text-white d-block d-lg-none left-part-open'
                : 'bg-primary show-left-part text-white d-block d-lg-none'
            }
            onClick={this.props.showHidePanel}
          >
            <i
              className={
                this.props.isShowContacts
                  ? 'fas fa-chevron-left'
                  : 'fas fa-chevron-right'
              }
            />
          </span>
          <div>
            <div className="d-flex align-items-center p-3 border-bottom">
              <div className="mr-3">
                <img
                  src={this.props.selectedContact.avatarUrl}
                  onError={this.addDefaultSrc}
                  alt={this.props.selectedContact.firstName}
                  className="rounded-circle"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h5 className="message-title mb-0">{`${this.props.selectedContact.firstName} ${this.props.selectedContact.lastName}`}</h5>
              </div>

              <div className="row mx-auto mr-1">
                <span id="video-attachment" className=""></span>
              </div>
              <div className="row ml-auto mr-1">
                {this.props.selectedContact.userId !== 0 && (
                  <>
                    <Button
                      outline
                      color={this.props.isVideoChatting ? 'danger' : 'primary'}
                      type="button"
                      id="video-button"
                      onClick={
                        this.props.isVideoChatting
                          ? this.props.endVideoChat
                          : this.props.startVideoChat
                      }
                      active={this.props.isVideoChatting}
                    >
                      <i
                        className={
                          this.props.isVideoChatting
                            ? 'fas fa-video-slash'
                            : 'fas fa-video'
                        }
                      />
                      {this.props.isVideoChatting ? ' END' : ''}
                    </Button>

                    <ViewProfileDropdown
                      selectedContact={this.props.selectedContact}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="scrollbar-container ps">
              <ul
                id="chat-list"
                className="chat-list p-4"
                style={{ height: 'calc(100vh - 334px)' }}
                ref={(ul) => {
                  this.chatList = ul;
                }}
              >
                {this.props.messages.map((message) => (
                  <ChatMessage
                    message={message}
                    currentUser={this.props.currentUser}
                    key={message.id}
                    onDeleteClicked={this.onDeleteClicked}
                    videoChat={this.props.videoChat}
                    selectedContact={this.props.selectedContact}
                    joinVideoChat={this.props.joinVideoChat}
                  />
                ))}
              </ul>
              <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                <div
                  className="ps__thumb-x"
                  tabIndex={0}
                  style={{ left: 0, width: 0 }}
                />
              </div>
              <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                <div
                  className="ps__thumb-y"
                  tabIndex={0}
                  style={{ top: 0, height: 0 }}
                />
              </div>
            </div>
          </div>
          {this.props.selectedContact.userId !== 0 && (
            <form className="card-body border-top">
              <div className="d-flex">
                <input
                  id="message-text"
                  placeholder="Type your message"
                  required
                  type="text"
                  className="form-control mr-2 form-control"
                  onChange={this.onSendMessageChange}
                  value={this.state.sendMessage}
                  onKeyDown={this.onSendKeyDown}
                  maxLength={1000}
                />
                <Button outline color="secondary" type="button">
                  <i className="fas fa-paper-plane" />
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="button"
                  id="attachment-button"
                  active={this.state.attachmentPopover}
                >
                  <i className="fas fa-paperclip" />
                </Button>

                <Popover
                  placement="top-end"
                  isOpen={this.state.attachmentPopover}
                  target="attachment-button"
                  toggle={this.toggleAttachmentPopover}
                >
                  <PopoverHeader>Send a File</PopoverHeader>
                  <PopoverBody>
                    Allowed Types:
                    <small>
                      <b>
                        .jpg, .jpeg, .png, .gif, .webp, .pdf, .doc, .docx, .txt,
                        .xlsx
                      </b>
                    </small>
                    <Files
                      maxUpload={1}
                      isMultiple={false}
                      awsUrls={this.onGetFileUpload}
                      mimeString="image/*,text/plain,text/csv,application/pdf,application/msword,application/vnd.ms-excel"
                    />
                  </PopoverBody>
                </Popover>
                <Popover
                  placement="bottom"
                  target="video-attachment"
                  trigger="click"
                  className="popper-frame"
                  popperClassName="popper-frame"
                  isOpen={this.props.isVideoChatting}
                  toggle={this.toggleVideoPopover}
                >
                  <PopoverHeader>Valore Video Chat</PopoverHeader>
                  <PopoverBody>
                    <VideoChatFrame url={this.props.videoChat.url} />
                  </PopoverBody>
                </Popover>
              </div>
            </form>
          )}
        </div>

        {this.state.showDeleteAlert && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Delete"
            confirmBtnBsStyle="danger"
            title="Delete Message?"
            onConfirm={this.onDeleteConfirmed}
            onCancel={this.onDeleteCanceled}
            focusCancelBtn
          >
            Are you sure you want to delete this message?
          </SweetAlert>
        )}
      </div>
    );
  }
}

ChatBox.propTypes = {
  selectedContact: PropTypes.shape({
    userId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.string,
  }),
  messages: PropTypes.arrayOf(PropTypes.object),
  onGenericError: PropTypes.func,
  toast: PropTypes.func,
  loadMessages: PropTypes.func,
  sendMessage: PropTypes.func,
  sendDeleteMessage: PropTypes.func,
  isShowContacts: PropTypes.bool,
  showHidePanel: PropTypes.func,
  isVideoChatting: PropTypes.bool,
  joinVideoChat: PropTypes.func,
  startVideoChat: PropTypes.func,
  endVideoChat: PropTypes.func,
  videoChat: PropTypes.shape({
    url: PropTypes.string,
  }),
};
