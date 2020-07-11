import React, { Component } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { logOut } from '../../services/userService';

import logger from 'sabio-debug';
const _logger = logger.extend('UserProfileNavBar');

export default class UserProfileNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
      dropdownClass: 'user-dd dropdown-menu dropdown-menu-right',
    };
  }

  onClickLogout = () => {
    logOut().then(this.onSuccessLogout).catch(this.onErrorLogout);
  };

  onClickReset = () => {
    let myId = this.props.currentUser.id;
    this.props.history.push(`/user/${myId}/resetPassword`);
  };

  onErrorLogout = (error) => {
    _logger('error logging out', error);
  };

  onSuccessLogout = (response) => {
    _logger('success logging out', response);
    this.props.history.push(`/auth/login`, {
      type: 'LOGOUT',
    });
  };

  onProfileClick = () => {
    let myId = this.props.currentUser.id;
    let userRole = this.props.currentUser.roles;
    if (userRole.includes('Provider')) {
      this.props.history.push(`/provider/${myId}/editProfile`);
    } else {
      this.props.history.push(`/user/${myId}/editProfile`);
    }
  };

  onMessagesClicked = () => {
    this.props.history.push(`/messages`);
  };

  toggle = () => {
    if (!this.state.dropdownOpen) {
      this.setState({
        dropdownOpen: true,
        dropdownClass: 'user-dd dropdown-menu dropdown-menu-right show',
      });
    } else {
      this.setState({
        dropdownOpen: false,
        dropdownClass: 'user-dd dropdown-menu dropdown-menu-right',
      });
    }
  };

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="dropdown nav-link"
      >
        <DropdownToggle
          tag="a"
          className="pro-pic nav-link dropdown-toggle "
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {this.props.currentUser.avatarUrl ? (
            <img
              src={this.props.currentUser.avatarUrl}
              alt={this.props.currentUser.firstName}
              className="rounded-circle"
              width={31}
            />
          ) : (
            <i
              className="rounded-circle fas fa-user"
              width={31}
              height={31}
            ></i>
          )}
        </DropdownToggle>

        <DropdownMenu className={this.state.dropDownClass}>
          <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
            <div>
              <img
                src={this.props.currentUser.avatarUrl}
                alt={this.props.currentUser.firstName}
                className="rounded-circle"
                width={60}
              />
            </div>
            <div className="ml-2">
              <h4 className="mb-0">
                {this.props.currentUser.firstName}{' '}
                {this.props.currentUser.lastName}
              </h4>
              <p className=" mb-0">{this.props.currentUser.email}</p>
            </div>
          </div>
          <DropdownItem onClick={this.onProfileClick} role="menuitem">
            <i className="ti-user mr-1 ml-1" /> Manage My Profile
          </DropdownItem>
          <DropdownItem
            disabled={
              !this.props.currentUser.roles.includes('Subscribed' || 'SysAdmin')
            }
            onClick={this.onMessagesClicked}
          >
            <i className="ti-email mr-1 ml-1" />{' '}
            {this.props.currentUser.roles.includes('Subscribed' || 'SysAdmin')
              ? 'Messages'
              : 'Messages - Subscribe to access'}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.onClickReset}>
            <i className="fa fa-exchange-alt mr-1 ml-1"></i> Reset Password
          </DropdownItem>
          <DropdownItem onClick={this.onClickLogout}>
            <i className="fa fa-power-off mr-1 ml-1"></i> Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

UserProfileNavbar.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
