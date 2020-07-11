import React from 'react';
import ContactList from '../../components/messages/ContactList';
import ChatBox from '../../components/messages/ChatBox';
import { toast } from 'react-toastify';
import { API_HOST_PREFIX } from '../../services/serviceHelpers';
import logger from 'sabio-debug';
import PropTypes from 'prop-types';
import * as signalR from '@microsoft/signalr';

const _logger = logger.extend('App');

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContact: {
        userId: 0,
        firstName:
          'Please select a user to message. It is not recommended to share sensitive information here',
        lastName: '',
        avatarUrl: 'https://image.flaticon.com/icons/svg/271/271218.svg',
      },
      contacts: [],
      messages: [],
      videoChat: { url: '' },
      contactsLoaded: false,
      paramContact: false,
      showContacts: false,
      isVideoChatting: false,
    };
    this.hubFuncs = {
      ReceiveContacts: this.mapContactsToState,
      ReceiveMessages: this.mapMessagesToState,
      AddMessage: this.mapMessageToState,
      RecieveDelete: this.recieveDeleteMessage,
      SendAddContact: this.sendAddContact,
      ReceiveAddContact: this.recieveAddContact,
      AddVideoMessage: this.mapVideoMessageToState,
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST_PREFIX}/chathub`)
      .withAutomaticReconnect()
      .build();

    _logger('constructor props:', props);
  }

  componentDidMount = () => {
    this.configureHub();
  };

  componentDidUpdate() {
    const locationSplit = this.props.location.pathname.split('/');
    const contactId = locationSplit[2];
    if (
      contactId !== '' &&
      this.state.contactsLoaded &&
      !this.state.paramContact
    ) {
      let selectedContact = this.selectContactFromUrlParams(contactId);
      if (selectedContact) {
        this.selectContact(selectedContact, true);
      } else {
        this.sendAddContact(contactId);
      }
    }
  }

  componentWillUnmount = () => {
    this.unregisterHubFuncs();
    this.hubConnection.stop();
  };

  configureHub = () => {
    this.hubConnection
      .start()
      .then(this.initializeContacts)
      .catch(this.onGenericError);
    for (let key in this.hubFuncs) {
      this.hubConnection.on(key, this.hubFuncs[key]);
    }
  };

  unregisterHubFuncs = () => {
    for (let key in this.hubFuncs) {
      this.unsubscribe(key);
    }
  };

  unsubscribe = (service) => {
    this.hubConnection.off(service);
  };

  initializeContacts = () => {
    this.hubConnection.invoke('GetContacts').catch((err) => _logger(err));
  };

  initializeConversation = (contactId) => {
    this.hubConnection
      .invoke('GetConversation', contactId)
      .catch((err) => _logger(err));
  };

  selectContactFromUrlParams = (id) => {
    let contacts = [...this.state.contacts];
    let filteredContacts = contacts.filter(
      (contact) => contact.userId === parseInt(id)
    );
    if (filteredContacts.length > 0) {
      return filteredContacts[0];
    } else {
      return false;
    }
  };

  mapContactsToState = (res, ex) => {
    if (ex) {
      this.onGenericError(ex);
      return;
    }
    if (res) {
      this.setState((prevState) => {
        return {
          ...prevState,
          contacts: res,
          contactsLoaded: true,
        };
      });
    }
  };

  mapMessageToState = (res, ex) => {
    _logger(res);
    if (ex) {
      this.onGenericError(ex);
      return;
    }
    if (res) {
      let newMessages = [...this.state.messages];
      newMessages.push(res);
      this.setState((prevState) => {
        return {
          ...prevState,
          messages: newMessages,
        };
      });
    }
  };

  mapVideoMessageToState = (res, ex) => {
    if (ex) {
      this.onGenericError(ex);
      return;
    }
    if (res) {
      if (res.item.api_created !== true) {
        if (res.item.deleted === true) {
          let newMessages = [...this.state.messages];
          let videoMessage = {
            messageText: 'Video Chat Closed',
            id: Math.ceil(Math.random() * 100000000),
            sender: {
              userId: this.props.currentUser.userId,
            },
            recipient: {
              userId: this.props.currentUser.userId,
            },
            dateSent: new Date().toISOString(),
            dateRead: null,
            subject: null,
          };
          newMessages.push(videoMessage);
          this.setState((prevState) => {
            return {
              ...prevState,
              messages: newMessages,
              videoChat: {},
              isVideoChatting: false,
            };
          });
        }
        this.onGenericError(res.item.info);
      } else {
        let newMessages = [...this.state.messages];
        let videoMessage = {
          messageText: res.item.url.toString(),
          id: Math.ceil(Math.random() * 100000000),
          sender: {
            userId: this.props.currentUser.userId,
          },
          recipient: {
            userId: this.props.currentUser.userId,
          },
          dateSent: res.item.created_at,
          dateRead: null,
          subject: null,
        };
        newMessages.push(videoMessage);

        this.setState((prevState) => {
          return {
            ...prevState,
            messages: newMessages,
            videoChat: res.item,
          };
        });
      }
    }
  };

  mapMessagesToState = (res, ex) => {
    if (ex) {
      this.onGenericError(ex);
      return;
    }
    if (res) {
      this.setState((prevState) => {
        return {
          ...prevState,
          messages: res,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          messages: [],
        };
      });
    }
  };

  selectContact = (contact) => {
    this.props.history.push(`/messages/${contact.userId}`);
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedContact: contact,
        paramContact: true,
      };
    }, this.initializeConversation(contact.userId));
  };

  sendMessage = (messageText, recipientId, recipientName) => {
    this.hubConnection
      .invoke('SendMessage', messageText, recipientId, recipientName)
      .catch((err) => this.onGenericError(err));
  };

  sendDeleteMessage = (messageId) => {
    this.hubConnection
      .invoke('DeleteMessage', messageId)
      .catch((err) => this.onGenericError(err));
  };

  recieveDeleteMessage = (messageId) => {
    const oldMessages = [...this.state.messages];
    let newMessages = oldMessages.filter((message) => message.id !== messageId);
    this.setState({
      messages: newMessages,
    });
  };

  sendAddContact = (contactId) => {
    this.hubConnection
      .invoke('SendAddContact', parseInt(contactId))
      .catch((err) => this.onGenericError(err));
  };

  recieveAddContact = (res, ex) => {
    if (ex) {
      this.onGenericError(ex);
      return;
    }
    if (res) {
      let contactList = [...this.state.contacts];
      const isContactInList = contactList.find(
        (contact) => contact.userId === res.userId
      );
      if (isContactInList === undefined) {
        contactList.push(res);
        this.setState((prevState) => {
          return {
            ...prevState,
            contacts: contactList,
            selectedContact: res,
            messages: [],
          };
        });
      } else {
        this.selectContact(res);
      }
    }
  };

  startVideoChat = () => {
    this.hubConnection
      .invoke('StartVideoChat')
      .catch((err) => this.onGenericError(err));
  };

  endVideoChat = () => {
    this.hubConnection
      .invoke('EndVideoChat')
      .catch((err) => this.onGenericError(err));
  };

  joinVideoChat = (videoChat) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        videoChat: videoChat,
        isVideoChatting: true,
      };
    });
  };

  onShowHidePanelClicked = () => {
    this.setState({ showContacts: !this.state.showContacts });
  };

  onGenericError = (err) => {
    toast.error(err.toString(), {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <div className="email-app">
        <ContactList
          contacts={this.state.contacts}
          selectedContact={this.state.selectedContact}
          selectContact={this.selectContact}
          {...this.props}
          toast={toast}
          onGenericError={this.onGenericError}
          sendAddContact={this.sendAddContact}
          isShowContacts={this.state.showContacts}
        />
        <ChatBox
          selectedContact={this.state.selectedContact}
          key={this.state.selectedContact.userId}
          {...this.props}
          toast={toast}
          onGenericError={this.onGenericError}
          messages={this.state.messages}
          sendMessage={this.sendMessage}
          sendDeleteMessage={this.sendDeleteMessage}
          currentUser={this.props.currentUser}
          isShowContacts={this.state.showContacts}
          showHidePanel={this.onShowHidePanelClicked}
          videoChat={this.state.videoChat}
          isVideoChatting={this.state.isVideoChatting}
          startVideoChat={this.startVideoChat}
          endVideoChat={this.endVideoChat}
          joinVideoChat={this.joinVideoChat}
        />
      </div>
    );
  }
}

Messages.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default Messages;
