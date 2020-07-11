import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import UserSelect from '../utilities/userselect/UserSelect';
import Anon from '../../assets/images/users/1.jpg';

export default class ContactList extends Component {
  mapContactsToList = (contacts) => {
    let contactsElements = contacts.map((contact) => (
      <ListGroupItem
        className="nav-item"
        key={contact.userId}
        active={contact.userId === this.props.selectedContact.userId}
        onClick={() => this.props.selectContact(contact)}
      >
        <span className="message-item">
          <span className="user-img mr-2">
            <img
              src={contact.avatarUrl}
              onError={this.addDefaultSrc}
              alt={contact.firstName}
              className="rounded-circle "
              width={35}
              height={35}
            />
          </span>
          <div className="mail-content">
            <h6 className="message-title">
              {`${contact.firstName} ${contact.lastName}`}
            </h6>
          </div>
        </span>
      </ListGroupItem>
    ));

    return contactsElements;
  };

  addDefaultSrc(ev) {
    ev.target.src = Anon;
  }

  onSelectUserChange = (user) => {
    this.props.sendAddContact(user.value);
  };

  render() {
    return (
      <div
        className={
          this.props.isShowContacts
            ? 'left-part bg-white show-panel'
            : 'left-part bg-white'
        }
      >
        <div className="p-3 border-bottom">
          <h5 className="card-title">Search Contacts</h5>
          <UserSelect
            onError={this.props.onGenericError}
            onChange={this.onSelectUserChange}
          />
        </div>
        <ListGroup className="list-unstyled d-block mailbox">
          <div
            className="message-center"
            style={{ height: 'calc(100vh - 290px)' }}
          >
            {this.mapContactsToList(this.props.contacts)}
          </div>
        </ListGroup>
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  selectedContact: PropTypes.shape({
    userId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  selectContact: PropTypes.func.isRequired,
  onGenericError: PropTypes.func.isRequired,
  sendAddContact: PropTypes.func,
  isShowContacts: PropTypes.bool,
};
