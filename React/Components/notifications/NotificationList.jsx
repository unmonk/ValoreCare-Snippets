import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import NotificationItem from './NotificationItem';
import { API_HOST_PREFIX } from '../../services/serviceHelpers';
import * as signalR from '@microsoft/signalr';
import logger from 'sabio-debug';
import './Notifications.css';
import notificationAudio from '../../assets/images/notification.wav';
//import PropTypes from 'prop-types';
const _logger = logger.extend('App');

export default class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      dropdownClass: 'mailbox dropdown-menu dropdown-menu-right',
      totalCount: 0,
      notifications: [],
      mappedNotifications: [],
    };
    this.hubFuncs = {
      ReceiveNotification: this.receieveNotification,
      ReceiveNotifications: this.receieveNotifications,
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST_PREFIX}/notificationhub`)
      .withAutomaticReconnect()
      .build();

    _logger('constructor props:', props);
  }

  componentDidMount = () => {
    this.configureHub();
  };

  configureHub = () => {
    this.hubConnection
      .start()
      .then(this.initilizeNotifications)
      .catch(this.onGenericError);
    for (let key in this.hubFuncs) {
      this.hubConnection.on(key, this.hubFuncs[key]);
    }
  };

  initilizeNotifications = () => {
    this.hubConnection.invoke('GetNotifications').catch((err) => _logger(err));
  };

  componentWillUnmount = () => {
    this.unregisterHubFuncs();
    this.hubConnection.stop();
  };

  unregisterHubFuncs = () => {
    for (let key in this.hubFuncs) {
      this.unsubscribe(key);
    }
  };

  unsubscribe = (service) => {
    this.hubConnection.off(service);
  };

  toggle = () => {
    if (!this.state.dropdownOpen) {
      this.onNotificationsViewed();
      this.setState({
        dropdownOpen: true,
        dropdownClass: 'mailbox dropdown-menu dropdown-menu-right show',
      });
    } else {
      this.setState({
        dropdownOpen: false,
        dropdownClass: 'mailbox dropdown-menu dropdown-menu-right',
        totalCount: 0,
      });
    }
  };

  onNotificationsViewed = () => {
    this.hubConnection
      .invoke('NotificationsViewed')
      .catch((err) => _logger(err));
  };

  receieveNotification = (notification) => {
    const notificationAudioApi = new Audio(notificationAudio);
    let notifications = [...this.state.notifications];
    notifications.unshift(notification);
    let mappedNotifications = this.mapNotifications(notifications);
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          notifications: notifications,
          mappedNotifications: mappedNotifications,
          totalCount: notifications.length,
        };
      },
      () => notificationAudioApi.play()
    );
  };

  receieveNotifications = (notifications) => {
    if (notifications) {
      let mappedNotifications = this.mapNotifications(notifications);
      this.setState((prevState) => {
        return {
          ...prevState,
          notifications: notifications,
          mappedNotifications: mappedNotifications,
          totalCount: notifications.length,
        };
      });
    }
  };

  mapNotifications = (notifications) => {
    let mappedNotifications = [];
    if (notifications) {
      mappedNotifications = notifications
        .slice(0, 4)
        .map((notification) => (
          <NotificationItem
            {...this.props}
            {...notification}
            toggle={this.toggle}
            key={notification.id}
          />
        ));
    }
    return mappedNotifications;
  };

  render() {
    return (
      <Dropdown
        isOpen={this.dropdownOpen}
        toggle={this.toggle}
        className="dropdown nav-link"
      >
        <DropdownToggle
          tag="a"
          className="nav-link"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <i className="mdi mdi-bell font-24"></i>
          {this.state.totalCount > 0 ? (
            <span className="button_badge">{this.state.totalCount}</span>
          ) : (
            ''
          )}
        </DropdownToggle>
        <DropdownMenu className={this.state.dropdownClass}>
          <span className="with-arrow">
            <span className="bg-primary" />
          </span>
          <div className="d-flex drop-title no-block align-items-center p-3 bg-primary text-white mb-2">
            <div>
              <h4 className="mb-0">{this.state.totalCount} New</h4>
              <p className="mb-0">Notifications</p>
            </div>
          </div>
          <div className="message-center notifications">
            {this.state.mappedNotifications}
          </div>
          <a
            className="nav-link text-center mb-1 text-dark"
            href="/notifications"
          >
            <strong>View All </strong>
            <i className="fa fa-angle-right" />
          </a>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
