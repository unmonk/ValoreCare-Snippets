import React, { Component } from 'react';
import ContactUsForm from '../../contactUs/ContactUsForm';
import { Container } from 'reactstrap';

export default class ContactUs extends Component {
  render() {
    return (
      <div className="section section-dark text-center pt-1 pb-1">
        <Container>
          <ContactUsForm />
        </Container>
      </div>
    );
  }
}
