import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';

export default function ViewProfileDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
        className=""
      >
        <Button color="link" active={dropdownOpen}>
          <i className="fas fa-ellipsis-v" />
        </Button>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          header
        >{`${props.selectedContact.firstName} ${props.selectedContact.lastName}`}</DropdownItem>
        <DropdownItem href="/profile/xx">Profile</DropdownItem>
        <DropdownItem href="/report/xx">Report</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

ViewProfileDropdown.propTypes = {
  selectedContact: PropTypes.shape({
    userId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};
